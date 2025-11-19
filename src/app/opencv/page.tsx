'use client'

import { useTheme } from '@/context/ThemeContext'
import CodeBlock from '@/components/CodeBlock'
import { Eye, ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import PDFDownload from '@/components/PDFDownload'

export default function OpenCVCheatSheet() {
  const { isDark } = useTheme()

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="mb-8">
        <Link href="/" className={`inline-flex items-center gap-2 ${isDark ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} mb-4`}>
          <ArrowLeft className="w-4 h-4" />
          Geri
        </Link>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-600">
              <Eye className="w-8 h-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold">OpenCV Cheat Sheet</h1>
              <p className={`${isDark ? 'text-gray-400' : 'text-gray-600'}`}>Computer vision</p>
            </div>
          </div>
          <PDFDownload title="OpenCV" sheetId="opencv" />
        </div>
      </div>

      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Temel Islemler</h2>

          <CodeBlock
            language="python"
            title="Goruntu Okuma/Yazma"
            code={`import cv2
import numpy as np

# Goruntu oku
img = cv2.imread('image.jpg')
img_gray = cv2.imread('image.jpg', cv2.IMREAD_GRAYSCALE)

# Goruntu yaz
cv2.imwrite('output.jpg', img)

# Goruntu goster
cv2.imshow('Window', img)
cv2.waitKey(0)
cv2.destroyAllWindows()

# Boyutlar
height, width, channels = img.shape
print(f"Size: {width}x{height}, Channels: {channels}")

# Pixel erisimi
pixel = img[100, 50]  # (y, x)
blue, green, red = img[100, 50]

# Pixel degistir
img[100, 50] = [255, 255, 255]`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Renk Donusumleri</h2>

          <CodeBlock
            language="python"
            title="Color Conversion"
            code={`# BGR -> Grayscale
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# BGR -> RGB
rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)

# BGR -> HSV
hsv = cv2.cvtColor(img, cv2.COLOR_BGR2HSV)

# BGR -> LAB
lab = cv2.cvtColor(img, cv2.COLOR_BGR2LAB)

# Grayscale -> BGR
bgr = cv2.cvtColor(gray, cv2.COLOR_GRAY2BGR)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Geometrik Donusumler</h2>

          <CodeBlock
            language="python"
            title="Resize ve Transform"
            code={`# Resize
resized = cv2.resize(img, (300, 200))
resized = cv2.resize(img, None, fx=0.5, fy=0.5)

# Interpolation
resized = cv2.resize(img, (300, 200), interpolation=cv2.INTER_LINEAR)
resized = cv2.resize(img, (300, 200), interpolation=cv2.INTER_CUBIC)

# Rotate
(h, w) = img.shape[:2]
center = (w // 2, h // 2)
M = cv2.getRotationMatrix2D(center, 45, 1.0)
rotated = cv2.warpAffine(img, M, (w, h))

# Flip
flipped_h = cv2.flip(img, 1)  # Horizontal
flipped_v = cv2.flip(img, 0)  # Vertical
flipped_b = cv2.flip(img, -1) # Both

# Crop
cropped = img[50:200, 100:300]  # [y1:y2, x1:x2]

# Translate
M = np.float32([[1, 0, 50], [0, 1, 100]])
translated = cv2.warpAffine(img, M, (w, h))`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Filtreleme</h2>

          <CodeBlock
            language="python"
            title="Image Filters"
            code={`# Blur
blur = cv2.blur(img, (5, 5))
gaussian = cv2.GaussianBlur(img, (5, 5), 0)
median = cv2.medianBlur(img, 5)
bilateral = cv2.bilateralFilter(img, 9, 75, 75)

# Sharpen
kernel = np.array([[-1,-1,-1],
                   [-1, 9,-1],
                   [-1,-1,-1]])
sharpened = cv2.filter2D(img, -1, kernel)

# Edge detection
edges = cv2.Canny(img, 100, 200)

# Sobel
sobelx = cv2.Sobel(gray, cv2.CV_64F, 1, 0, ksize=5)
sobely = cv2.Sobel(gray, cv2.CV_64F, 0, 1, ksize=5)

# Laplacian
laplacian = cv2.Laplacian(gray, cv2.CV_64F)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Thresholding</h2>

          <CodeBlock
            language="python"
            title="Esikleme"
            code={`# Simple threshold
ret, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY)
ret, thresh = cv2.threshold(gray, 127, 255, cv2.THRESH_BINARY_INV)

# Adaptive threshold
adaptive = cv2.adaptiveThreshold(gray, 255,
    cv2.ADAPTIVE_THRESH_GAUSSIAN_C, cv2.THRESH_BINARY, 11, 2)

# Otsu threshold
ret, otsu = cv2.threshold(gray, 0, 255,
    cv2.THRESH_BINARY + cv2.THRESH_OTSU)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Morfolojik Islemler</h2>

          <CodeBlock
            language="python"
            title="Morphological Operations"
            code={`# Kernel
kernel = np.ones((5, 5), np.uint8)
kernel = cv2.getStructuringElement(cv2.MORPH_RECT, (5, 5))
kernel = cv2.getStructuringElement(cv2.MORPH_ELLIPSE, (5, 5))

# Erosion
eroded = cv2.erode(img, kernel, iterations=1)

# Dilation
dilated = cv2.dilate(img, kernel, iterations=1)

# Opening (erosion + dilation)
opening = cv2.morphologyEx(img, cv2.MORPH_OPEN, kernel)

# Closing (dilation + erosion)
closing = cv2.morphologyEx(img, cv2.MORPH_CLOSE, kernel)

# Gradient
gradient = cv2.morphologyEx(img, cv2.MORPH_GRADIENT, kernel)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Contours</h2>

          <CodeBlock
            language="python"
            title="Kontur Bulma"
            code={`# Find contours
contours, hierarchy = cv2.findContours(
    thresh, cv2.RETR_TREE, cv2.CHAIN_APPROX_SIMPLE
)

# Draw contours
cv2.drawContours(img, contours, -1, (0, 255, 0), 2)
cv2.drawContours(img, contours, 0, (0, 255, 0), 2)  # First only

# Contour properties
for cnt in contours:
    area = cv2.contourArea(cnt)
    perimeter = cv2.arcLength(cnt, True)

    # Bounding rectangle
    x, y, w, h = cv2.boundingRect(cnt)
    cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)

    # Minimum enclosing circle
    (x, y), radius = cv2.minEnclosingCircle(cnt)
    cv2.circle(img, (int(x), int(y)), int(radius), (0, 255, 0), 2)

    # Approximation
    epsilon = 0.01 * cv2.arcLength(cnt, True)
    approx = cv2.approxPolyDP(cnt, epsilon, True)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Cizim</h2>

          <CodeBlock
            language="python"
            title="Drawing"
            code={`# Line
cv2.line(img, (0, 0), (100, 100), (255, 0, 0), 2)

# Rectangle
cv2.rectangle(img, (50, 50), (200, 200), (0, 255, 0), 2)
cv2.rectangle(img, (50, 50), (200, 200), (0, 255, 0), -1)  # Filled

# Circle
cv2.circle(img, (100, 100), 50, (0, 0, 255), 2)

# Ellipse
cv2.ellipse(img, (100, 100), (50, 25), 0, 0, 360, (255, 0, 0), 2)

# Polygon
pts = np.array([[10, 5], [20, 30], [70, 20], [50, 10]], np.int32)
cv2.polylines(img, [pts], True, (0, 255, 255), 2)

# Text
cv2.putText(img, 'Hello', (10, 50), cv2.FONT_HERSHEY_SIMPLEX,
            1, (255, 255, 255), 2)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Video</h2>

          <CodeBlock
            language="python"
            title="Video Islemleri"
            code={`# Video capture
cap = cv2.VideoCapture('video.mp4')
cap = cv2.VideoCapture(0)  # Webcam

while cap.isOpened():
    ret, frame = cap.read()
    if not ret:
        break

    # Process frame
    gray = cv2.cvtColor(frame, cv2.COLOR_BGR2GRAY)

    cv2.imshow('Frame', gray)
    if cv2.waitKey(1) & 0xFF == ord('q'):
        break

cap.release()
cv2.destroyAllWindows()

# Video writer
fourcc = cv2.VideoWriter_fourcc(*'XVID')
out = cv2.VideoWriter('output.avi', fourcc, 20.0, (640, 480))
out.write(frame)
out.release()`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Feature Detection</h2>

          <CodeBlock
            language="python"
            title="Ozellik Bulma"
            code={`# Harris corner detection
gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
gray = np.float32(gray)
dst = cv2.cornerHarris(gray, 2, 3, 0.04)
img[dst > 0.01 * dst.max()] = [0, 0, 255]

# Shi-Tomasi corners
corners = cv2.goodFeaturesToTrack(gray, 25, 0.01, 10)
for corner in corners:
    x, y = corner.ravel()
    cv2.circle(img, (int(x), int(y)), 3, (0, 255, 0), -1)

# ORB detector
orb = cv2.ORB_create()
keypoints, descriptors = orb.detectAndCompute(gray, None)
img = cv2.drawKeypoints(img, keypoints, None)`}
          />
        </section>

        <section>
          <h2 className="text-2xl font-bold mb-4 text-primary">Face Detection</h2>

          <CodeBlock
            language="python"
            title="Yuz Tespiti"
            code={`# Haar cascade
face_cascade = cv2.CascadeClassifier(
    cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
)

gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)

# Detect faces
faces = face_cascade.detectMultiScale(
    gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30)
)

# Draw rectangles
for (x, y, w, h) in faces:
    cv2.rectangle(img, (x, y), (x+w, y+h), (0, 255, 0), 2)`}
          />
        </section>
      </div>
    </div>
  )
}
