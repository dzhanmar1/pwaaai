import re

# UPDATE INDEX.HTML
with open('d:/projects/np/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

if 'id="bg-music"' not in html:
    audio_tag = '\n    <!-- Фоновая музыка -->\n    <audio id="bg-music" src="audio/back-music.mp3" loop></audio>\n'
    html = html.replace('    <script src="script.js"></script>', audio_tag + '    <script src="script.js"></script>')
    with open('d:/projects/np/index.html', 'w', encoding='utf-8') as f:
        f.write(html)
    print("index.html updated")

# UPDATE SCRIPT.JS
with open('d:/projects/np/script.js', 'r', encoding='utf-8') as f:
    js = f.read()

# I need to find the updateSlide() function and append the logic.
# Let's see if updateSlide exists.
update_logic = """
    // Фоновая музыка
    const bgMusic = document.getElementById('bg-music');
    if (bgMusic) {
        bgMusic.volume = 0.15; // Пониженная громкость
        if (currentSlide === 2 || currentSlide === 13) {
            bgMusic.play().catch(e => console.log('Autoplay prevented', e));
        } else {
            bgMusic.pause();
        }
    }
"""

# Let's insert it inside updateSlide(). I'll replace the closing brace of updateSlide() if I find it.
# Wait, updateSlide ends with:
#     if (currentSlide === 10) resetMindmap();
#     if (currentSlide === 12) { resetTimer(); ... } // Actually wait, I swapped slides! Slide 13 is now poster.
# Let's just find `document.getElementById('current-slide').textContent = currentSlide;`
# and insert it there.

if 'const bgMusic' not in js:
    js = js.replace("document.getElementById('current-slide').textContent = currentSlide;", 
                    "document.getElementById('current-slide').textContent = currentSlide;\n" + update_logic)
    with open('d:/projects/np/script.js', 'w', encoding='utf-8') as f:
        f.write(js)
    print("script.js updated")

