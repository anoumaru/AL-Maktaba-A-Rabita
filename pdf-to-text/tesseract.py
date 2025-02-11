#Upload the file
from google.colab import files
uploaded = files.upload()

# Install dependencies
# !apt-get install poppler-utils
# !apt install tesseract-ocr
# !apt install libtesseract-dev
# !pip install pytesseract pdf2image
# !sudo apt-get install tesseract-ocr-ara


#Convert PDF to images
from pdf2image import convert_from_path
import os

# Specify the path to Poppler binaries
poppler_path = "/usr/bin"

# Convert PDF to images
images = convert_from_path('tawheed-pages-1.pdf', poppler_path=poppler_path)

# Check how many pages were converted
print(f"Number of pages: {len(images)}")

#Perform OCR
import pytesseract
from PIL import Image

# Set Tesseract path (if needed)
pytesseract.pytesseract.tesseract_cmd = '/usr/bin/tesseract'

# Extract text from each image
extracted_text = ""
for i, image in enumerate(images):
    text = pytesseract.image_to_string(image, lang='ara')  # 'ara' for Arabic
    extracted_text += f"Page {i+1}:\n{text}\n\n"

#Save and download the extracted text
with open('extracted_text.txt', 'w', encoding='utf-8') as f:
    f.write(extracted_text)

from google.colab import files
files.download('extracted_text.txt')