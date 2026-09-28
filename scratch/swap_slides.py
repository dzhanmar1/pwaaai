import re

with open('d:/projects/np/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# Current Slide 11 is "Письменная работа"
slide_11_match = re.search(r'<!-- Слайд 11: Письменная работа -->.*?</div>\s*</div>\s*</div>', html, re.DOTALL)
slide_11_content = slide_11_match.group(0)

# Current Slide 12 is "Физминутка"
slide_12_match = re.search(r'<!-- Слайд 12: Физминутка -->.*?</div>\s*</div>\s*</div>', html, re.DOTALL)
slide_12_content = slide_12_match.group(0)

# Swap them and rename their IDs and Comments
new_slide_11 = slide_12_content.replace('slide-12', 'slide-11').replace('Слайд 12', 'Слайд 11')
new_slide_12 = slide_11_content.replace('slide-11', 'slide-12').replace('Слайд 11', 'Слайд 12')

# Replace in html
html = html.replace(slide_11_content, '{{SLIDE_11_PLACEHOLDER}}')
html = html.replace(slide_12_content, '{{SLIDE_12_PLACEHOLDER}}')

html = html.replace('{{SLIDE_11_PLACEHOLDER}}', new_slide_11)
html = html.replace('{{SLIDE_12_PLACEHOLDER}}', new_slide_12)

with open('d:/projects/np/index.html', 'w', encoding='utf-8') as f:
    f.write(html)

print('Swapped slides in HTML')
