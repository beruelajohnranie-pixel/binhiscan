BinhiScan scan repair
====================
This package keeps the responsive design and reconnects the scan flow to the bundled TensorFlow Lite model.

IMPORTANT:
- Extract the ZIP first.
- Start a local web server from this folder: python -m http.server 8000
- Open http://localhost:8000 (or http://localhost:8000/index.html).
- The TensorFlow.js runtime is loaded from a CDN, so internet is required on first load.
- Wait for the model to load before scanning.
- Camera access usually requires localhost or HTTPS.
- Model predictions depend on the accuracy and input format of the included model; test all supported classes.

Included model files: model.tflite and labels.txt.
