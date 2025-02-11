# Upload the PDF
from google.colab import files
uploaded = files.upload()

#Install Dependencies
# !apt-get install -y poppler-utils tesseract-ocr tesseract-ocr-ara libtesseract-dev
# !pip install pytesseract pdf2image

#Convert PDF to Images
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


#  Preprocess Images for Better OCR
from PIL import Image, ImageEnhance, ImageFilter

def preprocess_image(image):
    image = image.convert('L')  # Convert to grayscale
    image = image.filter(ImageFilter.MedianFilter(size=3))  # Reduce noise
    enhancer = ImageEnhance.Contrast(image)
    image = enhancer.enhance(2)  # Increase contrast
    return image

# Apply preprocessing to all images
processed_images = [preprocess_image(img) for img in images]

# Perform OCR on Each Page
import pytesseract

# Set Tesseract OCR language to Arabic
extracted_text = ""
for i, image in enumerate(processed_images):
    text = pytesseract.image_to_string(image, lang='ara')
    extracted_text += f"Page {i+1}:\n{text}\n\n"

# Save the extracted text to a file
with open("extracted_text.txt", "w", encoding="utf-8") as f:
    f.write(extracted_text)

# Step 6: Download the Extracted Text File
files.download("extracted_text.txt")
