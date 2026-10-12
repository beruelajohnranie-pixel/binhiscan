BINHISCAN — RESPONSIVE DESIGN UPDATE
====================================

This package is based on the BinhiScan source ZIP you provided.

MAIN FILE
---------
Open index.html (recommended), or BinhiScan.html. Keep style.css and app.js in the same folder.

DESIGN UPDATES
--------------
- Responsive desktop, tablet, and phone layouts
- Desktop layout uses available screen width; mobile remains thumb-friendly
- Compact layout for narrow phones and bottom navigation with safe-area spacing
- Improved hover, pressed, and keyboard-focus states
- Reduced-motion accessibility support
- Shared CSS and JavaScript entry for both HTML files to reduce design drift

FUNCTIONALITY
-------------
The existing app.js was preserved. This design update does not retrain the AI or replace its current identification integration. In the supplied source, seed identification uses the existing window.claude sample hook; it does not directly load the model.tflite file. Confirm your intended AI provider/integration before production use.

CAMERA
------
Camera access usually requires HTTPS or localhost and user permission.
