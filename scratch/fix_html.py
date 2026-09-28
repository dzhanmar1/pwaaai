import re

with open('d:/projects/np/index.html', 'r', encoding='utf-8') as f:
    html = f.read()

# I will find the exact start of Slide 11 and start of Slide 14 and replace everything in between.
start_idx = html.find('<!-- Слайд 11: Физминутка -->')
end_idx = html.find('<!-- Слайд 14: Рефлексия и ДЗ -->')

new_slides = '''<!-- Слайд 11: Физминутка -->
        <div class="slide" id="slide-11">
            <div class="slide-content center-content pulse-bg">
                <div class="stagger-1">
                    <h2 style="margin-bottom: 10px;">Физминутка</h2>
                </div>
                <div class="stagger-2 video-wrapper">
                    <video src="video/break.mp4" controls preload="metadata" ondblclick="toggleVideoFullScreen(this)"
                        title="Дважды кликните по видео, чтобы развернуть на весь экран"></video>
                </div>
            </div>
        </div>

        <!-- Слайд 12: Письменная работа -->
        <div class="slide" id="slide-12">
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

        <!-- Слайд 13: Защита Постера -->
        <div class="slide" id="slide-13">
            <div class="slide-content center-content pulse-bg" style="position: relative; overflow: hidden; background: linear-gradient(135deg, #ffffff, #fff5f0);">
                <!-- Animated background shapes for poster creation -->
                <div class="drawing-shapes shape1"><i class="fa-solid fa-palette"></i></div>
                <div class="drawing-shapes shape2"><i class="fa-solid fa-pen-nib"></i></div>
                <div class="drawing-shapes shape3"><i class="fa-solid fa-paintbrush"></i></div>

                <div class="stagger-1" style="position: relative; z-index: 2;">
                    <h1 style="font-size: 5rem; color: #E76F51; margin-bottom: 20px;"><i class="fa-solid fa-users-viewfinder"></i> Создание и защита Постеров</h1>
                </div>
                <div class="stagger-2" style="position: relative; z-index: 2;">
                    <p style="font-size: 2.5rem; color: #333; margin-bottom: 40px; font-weight: 700;">Тема: Алматы — город-сад</p>
                </div>

                <div class="stagger-3 timer-widget" style="position: relative; z-index: 2; padding: 60px 80px; background: rgba(255,255,255,0.95); width: 600px; text-align: center; border: 4px solid var(--accent-light-green);">
                    <div id="timer-icon-wrap" style="position: absolute; top: -45px; left: 50%; transform: translateX(-50%); background: white; border-radius: 50%; width: 90px; height: 90px; display: flex; align-items: center; justify-content: center; box-shadow: 0 10px 20px rgba(0,0,0,0.1); border: 4px solid var(--accent-light-green);">
                        <i class="fa-solid fa-hourglass-half" id="timer-icon" style="font-size: 3.5rem; color: var(--accent-green);"></i>
                    </div>
                    <div class="timer-setup">
                        <button onclick="adjustTimer(-1)" title="Уменьшить">-</button>
                        <span><b id="timer-setting">15</b> мин</span>
                        <button onclick="adjustTimer(1)" title="Увеличить">+</button>
                    </div>
                    <div class="time-display" id="timer-display">15:00</div>
                    <div class="timer-controls">
                        <button class="t-btn btn-start" onclick="startTimer()"><i class="fa-solid fa-play"></i>
                            Старт</button>
                        <button class="t-btn btn-pause" onclick="pauseTimer()"><i class="fa-solid fa-pause"></i>
                            Пауза</button>
                        <button class="t-btn btn-reset" onclick="resetTimer()"><i class="fa-solid fa-rotate-right"></i>
                            Сброс</button>
                    </div>
                    <!-- Прогресс бар таймера -->
                    <div class="timer-progress">
                        <div class="timer-bar" id="timer-bar"></div>
                    </div>
                </div>
            </div>
        </div>

        '''

new_html = html[:start_idx] + new_slides + html[end_idx:]

with open('d:/projects/np/index.html', 'w', encoding='utf-8') as f:
    f.write(new_html)
print('Fixed HTML tags for slides 11, 12, 13')
