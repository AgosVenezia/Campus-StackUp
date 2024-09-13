# -*- coding: utf-8 -*-
"""Untitled0.ipynb

Automatically generated by Colab.

Original file is located at
    https://colab.research.google.com/drive/1q16Sz1CSyUr3HP3DJ4FSumNVX1jI9GXn
"""



print("Hello, Google Colab!")

"""# My First Colab Notebook
This is a markdown cell where you can add text,
links, images, and more.
"""

from huggingface_hub import login
# Replace 'your-access-token' with your actual Hugging Face access token
# login(token="your-access-token")
login(token="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")

from transformers import AutoModelForMaskedLM, AutoTokenizer, pipeline

# Load the pre-trained model and tokenizer from Hugging Face
model_name = "bert-base-uncased"
tokenizer = AutoTokenizer.from_pretrained(model_name)
model = AutoModelForMaskedLM.from_pretrained(model_name)

# Create a pipeline for masked language modeling
nlp_pipeline = pipeline("fill-mask", model=model, tokenizer=tokenizer)

# Test the pipeline with a simple input
test_sentence = "The quick brown fox jumps over the [MASK] dog."
result = nlp_pipeline(test_sentence)

print(result)