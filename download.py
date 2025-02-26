import os
import requests

# List of image URLs and corresponding file names
image_urls = {
    "https://img.icons8.com/color/48/000000/amazon-web-services.png": "aws-glue.png",
    "https://img.icons8.com/color/48/000000/amazon-web-services.png": "aws-lambda.png",
    "https://img.icons8.com/color/48/000000/amazon-web-services.png": "amazon-s3.png",
    "https://img.icons8.com/color/48/000000/amazon-web-services.png": "aws-athena.png",
    "https://img.icons8.com/color/48/000000/pytorch.png": "pytorch.png",
    "https://img.icons8.com/color/48/000000/scikit-learn.png": "scikit-learn.png",
    "https://img.icons8.com/color/48/000000/matplotlib.png": "matplotlib.png"
}

# Desired location to save the images
save_directory = "./assets/images/icons"

# Create the directory if it doesn't exist
if not os.path.exists(save_directory):
    os.makedirs(save_directory)

# Function to download and save an image
def download_image(url, save_path):
    response = requests.get(url)
    if response.status_code == 200:
        with open(save_path, 'wb') as file:
            file.write(response.content)
    else:
        print(f"Failed to download image from {url}")

# Loop through the URLs and download each image
for url, filename in image_urls.items():
    save_path = os.path.join(save_directory, filename)
    download_image(url, save_path)

# Duplicating the images as required
duplicate_images = {
    "aws-glue.png": "aws-glue-duplicate.png",
    "aws-lambda.png": "aws-lambda-duplicate.png",
    "amazon-s3.png": "amazon-s3-duplicate.png",
    "aws-athena.png": "aws-athena-duplicate.png",
    "pytorch.png": "pytorch-duplicate.png",
    "scikit-learn.png": "scikit-learn-duplicate.png",
    "matplotlib.png": "matplotlib-duplicate.png"
}

for original, duplicate in duplicate_images.items():
    original_path = os.path.join(save_directory, original)
    duplicate_path = os.path.join(save_directory, duplicate)
    if os.path.exists(original_path):
        with open(original_path, 'rb') as file:
            content = file.read()
        with open(duplicate_path, 'wb') as file:
            file.write(content)
    else:
        print(f"Failed to duplicate image {original}")

print("Download and duplication completed.")
