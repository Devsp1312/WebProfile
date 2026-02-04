#!/bin/bash

# Update Nav background color for dark mode glass effect
sed -i 's/background-color: rgba(250, 250, 250, 0.8);/background-color: rgba(10, 10, 10, 0.7);/g' css/styles.css

# Update button styles
sed -i 's/padding: 12px 32px;/padding: 14px 36px;/g' css/styles.css
sed -i 's/border: none;/border: 1px solid rgba(255, 255, 255, 0.2);\n  font-family: inherit;\n  backdrop-filter: blur(10px);\n  -webkit-backdrop-filter: blur(10px);\n  position: relative;\n  overflow: hidden;/g' css/styles.css

echo "Glass effects applied!"
