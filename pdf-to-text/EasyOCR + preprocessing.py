# Upload the PDF
from google.colab import files
uploaded = files.upload()

# Install Dependencies
# !apt-get install -y poppler-utils
# !pip install easyocr pdf2image

# Convert PDF to Images
from pdf2image import convert_from_path
import matplotlib.pyplot as plt

# Get the uploaded file name dynamically
pdf_file = list(uploaded.keys())[0]

# Convert PDF pages to images
images = convert_from_path(pdf_file)

# Display the first page (for verification)
plt.imshow(images[0])
plt.axis('off')
plt.show()

# Preprocess Images for Better OCR
from PIL import Image, ImageEnhance, ImageFilter, ImageOps
import numpy as np

def preprocess_image(image):
    image = image.convert('L')  # Convert to grayscale
    image = ImageOps.autocontrast(image)  # Improve contrast
    image = image.filter(ImageFilter.SHARPEN)  # Sharpen the image
    image = ImageOps.invert(image)  # Invert colors (if needed)
    return image

# Apply preprocessing to all images
processed_images = [preprocess_image(img) for img in images]

# Perform OCR on Each Page using EasyOCR
import easyocr

# Initialize the EasyOCR reader with Arabic language support
reader = easyocr.Reader(['ar'])

# Extract text from each image
extracted_text = ""
for i, image in enumerate(processed_images):
    # Convert PIL image to numpy array
    image_np = np.array(image)
    # Perform OCR
    results = reader.readtext(image_np, paragraph=True, batch_size=10, text_threshold=0.7)
    page_text = "\n".join([result[1] for result in results])  # Extract the text part
    extracted_text += f"Page {i+1}:\n{page_text}\n\n"

# Post-process the extracted text
import re

def clean_text(text):
    # Fix missing spaces between words
    text = re.sub(r'(?<=[^\s])([اأإآء-ي])', r' \1', text)
    # Remove unwanted characters
    text = re.sub(r'[^\w\s.,،؛؟!]', '', text)
    # Fix common OCR errors (e.g., "ر ر" -> "ر")
    text = re.sub(r'ر\s+ر', 'ر', text)
    text = re.sub(r'ن\s+ن', 'ن', text)
    return text

extracted_text = clean_text(extracted_text)

# Save the extracted text to a file
with open("extracted_text.txt", "w", encoding="utf-8") as f:
    f.write(extracted_text)

# Step 6: Download the Extracted Text File
files.download("extracted_text.txt")