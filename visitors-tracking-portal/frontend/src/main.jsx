from fastapi import FastAPI
import cv2
import face_recognition
import numpy as np
import datetime
import os

app = FastAPI()

face_folder = "faces"

known_encodings = []
known_names = []

# 🧠 LOAD KNOWN FACES SAFELY
if os.path.exists(face_folder):
    for file in os.listdir(face_folder):
        try:
img_path = os.path.join(face_folder, file)
img = face_recognition.load_image_file(img_path)

encodings = face_recognition.face_encodings(img)

if len(encodings) > 0:
    known_encodings.append(encodings[0])
known_names.append(file.split(".")[0])

        except Exception as e:
print("Error loading face:", file, e)


@app.get("/scan")
def scan():
video = cv2.VideoCapture(0)  # open camera per request

success, frame = video.read()
video.release()

if not success:
    return { "error": "Camera not accessible" }

small = cv2.resize(frame, (0, 0), fx = 0.25, fy = 0.25)
rgb = small[:, :, :: -1]

face_locations = face_recognition.face_locations(rgb)
face_encodings = face_recognition.face_encodings(rgb, face_locations)

results = []

for encoding in face_encodings:
    matches = face_recognition.compare_faces(known_encodings, encoding)

name = "Unknown"

face_distances = face_recognition.face_distance(known_encodings, encoding)

if len(face_distances) > 0:
    best_match_index = np.argmin(face_distances)

if matches[best_match_index]:
    name = known_names[best_match_index]

results.append({
    "name": name,
    "time": str(datetime.datetime.now()),
    "confidence": round(100 - (min(face_distances) * 100), 2) if len(face_distances) > 0 else 60
})

return results
