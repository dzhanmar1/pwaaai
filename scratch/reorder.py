import re

with open('d:/projects/np/index.html', 'r', encoding='utf-8') as f:
    lines = f.readlines()

new_slide_11 = '''
        <!-- Слайд 11: Письменная работа -->
        <div class="slide" id="slide-11">
            <div class="slide-content center-content pulse-bg">
                <div class="stagger-1">
                    <h2 style="font-size: 5rem; color: #E76F51; margin-bottom: 20px;">Письменная работа</h2>
                </div>
                <div class="stagger-2" style="background: white; padding: 40px; border-radius: 20px; box-shadow: 0 10px 30px rgba(0,0,0,0.1); max-width: 900px;">
                    <p style="font-size: 2.5rem; color: #333; margin-bottom: 20px;"><b>Задание:</b></p>
                    <p style="font-size: 2rem; color: #555; text-align: left;">1. Откройте рабочие тетради и запишите сегодняшнее число.</p>
                    <p style="font-size: 2rem; color: #555; text-align: left;">2. Опираясь на составленный нами кластер и текст учебника, выпишите <b>3 эпитета</b> и <b>2 сравнения</b>, которыми Ю. Домбровский описывает Алма-Ату.</p>
                    <div style="margin-top: 30px; font-style: italic; color: #777; font-size: 1.8rem;">На выполнение задания у вас 5 минут.</div>
                </div>
            </div>
        </div>
'''

slide_10 = ''.join(lines[257:269])
slide_11 = ''.join(lines[270:326])
slide_12 = ''.join(lines[327:369])
slide_13 = ''.join(lines[370:404])

# Rename IDs inside the extracted blocks
slide_10_cluster = slide_11.replace('slide-11', 'slide-10').replace('Слайд 11', 'Слайд 10')
slide_12_fizminutka = slide_10.replace('slide-10', 'slide-12').replace('Слайд 10', 'Слайд 12')
slide_13_poster = slide_12.replace('slide-12', 'slide-13').replace('Слайд 12', 'Слайд 13')
slide_14_reflex = slide_13.replace('slide-13', 'slide-14').replace('Слайд 13', 'Слайд 14')

# Replace total slides
header_and_up_to_9 = ''.join(lines[:257])
footer = ''.join(lines[404:])
footer = footer.replace('>13</span>', '>14</span>')

new_html = header_and_up_to_9 + slide_10_cluster + '\n' + new_slide_11 + '\n' + slide_12_fizminutka + '\n' + slide_13_poster + '\n' + slide_14_reflex + footer

with open('d:/projects/np/index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)
print('index.html updated successfully!')
