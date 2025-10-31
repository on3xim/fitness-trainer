class AITrainer {
    constructor() {
        this.exerciseLibrary = {
            chest: [
                { name: "Жим штанги лежа", sets: "4", reps: "8-12", rest: "90 сек" },
                { name: "Жим гантелей на наклонной", sets: "3", reps: "10-15", rest: "75 сек" },
                { name: "Разведения гантелей", sets: "3", reps: "12-15", rest: "60 сек" },
                { name: "Отжимания", sets: "3", reps: "макс", rest: "60 сек" }
            ],
            back: [
                { name: "Подтягивания", sets: "4", reps: "6-12", rest: "90 сек" },
                { name: "Тяга штанги в наклоне", sets: "4", reps: "8-12", rest: "90 сек" },
                { name: "Тяга верхнего блока", sets: "3", reps: "10-15", rest: "75 сек" },
                { name: "Тяга гантели одной рукой", sets: "3", reps: "10-12", rest: "60 сек" }
            ],
            legs: [
                { name: "Приседания со штангой", sets: "4", reps: "6-10", rest: "120 сек" },
                { name: "Жим ногами", sets: "3", reps: "10-15", rest: "90 сек" },
                { name: "Выпады с гантелями", sets: "3", reps: "10-12", rest: "75 сек" },
                { name: "Сгибания ног лежа", sets: "3", reps: "12-15", rest: "60 сек" }
            ],
            shoulders: [
                { name: "Жим штанги стоя", sets: "4", reps: "8-12", rest: "90 сек" },
                { name: "Махи гантелями в стороны", sets: "3", reps: "12-15", rest: "60 сек" },
                { name: "Тяга штанги к подбородку", sets: "3", reps: "10-12", rest: "75 сек" },
                { name: "Разведения в наклоне", sets: "3", reps: "12-15", rest: "60 сек" }
            ],
            arms: [
                { name: "Подъем штанги на бицепс", sets: "3", reps: "10-12", rest: "75 сек" },
                { name: "Французский жим", sets: "3", reps: "10-15", rest: "75 сек" },
                { name: "Молотковые сгибания", sets: "3", reps: "12-15", rest: "60 сек" },
                { name: "Разгибания на блоке", sets: "3", reps: "12-15", rest: "60 сек" }
            ],
            cardio: [
                { name: "Беговая дорожка", sets: "1", reps: "20-30 мин", rest: "-" },
                { name: "Велотренажер", sets: "1", reps: "25-35 мин", rest: "-" },
                { name: "Эллипсоид", sets: "1", reps: "20-30 мин", rest: "-" },
                { name: "Скакалка", sets: "5", reps: "2-3 мин", rest: "30 сек" }
            ]
        };
    }

    generateProgram(formData) {
        const { goal, level, age, weight, height, equipment, days } = formData;
        
        const heightM = height / 100;
        const bmi = (weight / (heightM * heightM)).toFixed(1);
        
        let program = `
            <div class="program-header">
                <h4>📊 Ваши параметры:</h4>
                <p><strong>Возраст:</strong> ${age} лет</p>
                <p><strong>Вес/Рост:</strong> ${weight} кг / ${height} см</p>
                <p><strong>ИМТ:</strong> ${bmi} (${this.getBMICategory(bmi)})</p>
                <p><strong>Цель:</strong> ${this.getGoalText(goal)}</p>
                <p><strong>Уровень:</strong> ${this.getLevelText(level)}</p>
                <p><strong>Оборудование:</strong> ${this.getEquipmentText(equipment)}</p>
                <p><strong>Тренировок в неделю:</strong> ${days}</p>
            </div>
        `;

        program += this.generateDetailedWorkoutPlan(goal, level, days, equipment);
        program += this.generateNutritionAdvice(goal, weight, height, age);
        program += this.generateRecoveryTips(level, age, days);

        return program;
    }

    generateDetailedWorkoutPlan(goal, level, days, equipment) {
        let plan = `<div class="program-detail"><h4>💪 Детальная программа тренировок:</h4>`;
        
        const workoutTemplates = this.getWorkoutTemplate(goal, level, days);
        
        workoutTemplates.forEach((workout, index) => {
            plan += `<div class="workout-day"><h5>${workout.day}</h5>`;
            plan += `<p><em>${workout.focus}</em></p>`;
            
            workout.exercises.forEach(muscleGroup => {
                const exercises = this.exerciseLibrary[muscleGroup];
                if (exercises) {
                    exercises.slice(0, 2).forEach(exercise => {
                        plan += `
                            <div class="exercise-item">
                                <h5>${exercise.name}</h5>
                                <div class="exercise-stats">
                                    <span>Подходы: ${exercise.sets}</span>
                                    <span>Повторения: ${exercise.reps}</span>
                                    <span>Отдых: ${exercise.rest}</span>
                                </div>
                            </div>
                        `;
                    });
                }
            });
            
            plan += `</div>`;
        });
        
        plan += `</div>`;
        return plan;
    }

    getWorkoutTemplate(goal, level, days) {
        const templates = {
            weight_loss: {
                2: [
                    { day: "День 1: Full Body + Кардио", focus: "Все тело + жиросжигание", exercises: ['chest', 'back', 'legs', 'cardio'] },
                    { day: "День 2: Full Body + HIIT", focus: "Все тело + интервалы", exercises: ['shoulders', 'arms', 'legs', 'cardio'] }
                ],
                3: [
                    { day: "День 1: Верх тела + Кардио", focus: "Грудь, спина, плечи", exercises: ['chest', 'back', 'shoulders', 'cardio'] },
                    { day: "День 2: Ноги + Пресс", focus: "Ноги, ягодицы, кора", exercises: ['legs', 'cardio'] },
                    { day: "День 3: Full Body + HIIT", focus: "Круговая тренировка", exercises: ['chest', 'back', 'legs', 'cardio'] }
                ]
            },
            muscle_gain: {
                3: [
                    { day: "День 1: Грудь + Трицепс", focus: "Силовой жим", exercises: ['chest', 'arms'] },
                    { day: "День 2: Спина + Бицепс", focus: "Тяговые движения", exercises: ['back', 'arms'] },
                    { day: "День 3: Ноги + Плечи", focus: "База + дельты", exercises: ['legs', 'shoulders'] }
                ],
                4: [
                    { day: "День 1: Грудь", focus: "Объемная тренировка", exercises: ['chest'] },
                    { day: "День 2: Спина", focus: "Ширина и толщина", exercises: ['back'] },
                    { day: "День 3: Ноги", focus: "Сила и масса", exercises: ['legs'] },
                    { day: "День 4: Плечи + Руки", focus: "Дельты и бицепс/трицепс", exercises: ['shoulders', 'arms'] }
                ]
            }
        };

        return templates[goal]?.[days] || templates['weight_loss'][3];
    }

    getBMICategory(bmi) {
        if (bmi < 18.5) return "Недостаточный вес";
        if (bmi < 25) return "Нормальный вес";
        if (bmi < 30) return "Избыточный вес";
        return "Ожирение";
    }

    generateNutritionAdvice(goal, weight, height, age) {
        const bmr = 10 * weight + 6.25 * height - 5 * age + 5;
        let dailyCalories, protein, carbs, fat;
        
        switch(goal) {
            case 'weight_loss':
                dailyCalories = Math.round(bmr * 1.2 - 500);
                protein = Math.round(weight * 2.2);
                carbs = Math.round((dailyCalories * 0.4) / 4);
                fat = Math.round((dailyCalories * 0.25) / 9);
                break;
            case 'muscle_gain':
                dailyCalories = Math.round(bmr * 1.4 + 300);
                protein = Math.round(weight * 2.2);
                carbs = Math.round((dailyCalories * 0.5) / 4);
                fat = Math.round((dailyCalories * 0.25) / 9);
                break;
            default:
                dailyCalories = Math.round(bmr * 1.3);
                protein = Math.round(weight * 1.8);
                carbs = Math.round((dailyCalories * 0.45) / 4);
                fat = Math.round((dailyCalories * 0.3) / 9);
        }
        
        return `
            <div class="program-detail">
                <h4>🍎 Детальные рекомендации по питанию:</h4>
                <p><strong>Суточная норма калорий:</strong> ${dailyCalories} ккал</p>
                <p><strong>Белки:</strong> ${protein}г в день</p>
                <p><strong>Углеводы:</strong> ${carbs}г в день</p>
                <p><strong>Жиры:</strong> ${fat}г в день</p>
                <p><strong>Вода:</strong> 2-3 литра в день</p>
                <p><strong>Режим питания:</strong> 4-5 приемов пищи каждые 3-4 часа</p>
            </div>
        `;
    }

    generateRecoveryTips(level, age, days) {
        return `
            <div class="program-detail">
                <h4>🛌 План восстановления:</h4>
                <p><strong>Сон:</strong> 7-9 часов ежедневно</p>
                <p><strong>Растяжка:</strong> 10-15 минут после каждой тренировки</p>
                <p><strong>Дни отдыха:</strong> ${7 - days} дня в неделю - активное восстановление</p>
                <p><strong>Водный баланс:</strong> 35мл на 1кг веса</p>
                <p><strong>Стретчинг:</strong> Ежедневная утренняя растяжка 5-10 минут</p>
            </div>
        `;
    }

    getGoalText(goal) {
        const goals = {
            'weight_loss': 'Похудение',
            'muscle_gain': 'Набор мышечной массы',
            'strength': 'Увеличение силы',
            'endurance': 'Развитие выносливости',
            'toning': 'Тонирование тела'
        };
        return goals[goal] || goal;
    }

    getLevelText(level) {
        const levels = {
            'beginner': 'Начинающий',
            'intermediate': 'Средний',
            'advanced': 'Продвинутый'
        };
        return levels[level] || level;
    }

    getEquipmentText(equipment) {
        const equipmentMap = {
            'full_gym': 'Полный тренажерный зал',
            'basic_gym': 'Базовые тренажеры',
            'home': 'Домашние тренировки',
            'bodyweight': 'Только вес тела'
        };
        return equipmentMap[equipment] || equipment;
    }

    async answerQuestion(question) {
        await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
        
        const responses = {
            'привет': 'Привет! Рад вас видеть! Как ваши тренировки?',
            'как начать': 'Начните с базовых упражнений, сфокусируйтесь на технике и постепенно увеличивайте нагрузку.',
            'питание': 'Питание - это 70% успеха! Сбалансируйте белки, жиры и углеводы согласно вашим целям.',
            'восстановление': 'Восстановление так же важно, как и тренировки! Спите 7-9 часов и пейте достаточно воды.',
            'мотивация': 'Помните: прогресс - это марафон, а не спринт! Каждая тренировка приближает вас к цели!'
        };

        const lowerQuestion = question.toLowerCase();
        
        for (const [key, response] of Object.entries(responses)) {
            if (lowerQuestion.includes(key)) {
                return response;
            }
        }

        return 'Отличный вопрос! Для ваших индивидуальных рекомендаций заполните форму выше, и я создам персонализированную программу тренировок.';
    }
}

// Инициализация AI тренера
const aiTrainer = new AITrainer();

// Обработка формы
document.getElementById('fitness-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    
    const formData = {
        goal: document.getElementById('goal').value,
        level: document.getElementById('level').value,
        age: document.getElementById('age').value,
        weight: document.getElementById('weight').value,
        height: document.getElementById('height').value,
        equipment: document.getElementById('equipment').value,
        days: document.getElementById('days').value
    };

    // Показать загрузку
    document.getElementById('loading').classList.remove('hidden');
    document.getElementById('result').classList.add('hidden');

    // Имитация обработки AI
    setTimeout(() => {
        const program = aiTrainer.generateProgram(formData);
        document.getElementById('program-output').innerHTML = program;
        document.getElementById('loading').classList.add('hidden');
        document.getElementById('result').classList.remove('hidden');
    }, 2000);
});

// Функции чата
function addMessage(message, isUser = false) {
    const chatMessages = document.getElementById('chat-messages');
    const messageDiv = document.createElement('div');
    messageDiv.className = `message ${isUser ? 'user-message' : 'ai-message'}`;
    
    messageDiv.innerHTML = `
        <div class="message-avatar">${isUser ? '👤' : '🤖'}</div>
        <div class="message-content">
            <p>${message}</p>
        </div>
    `;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

async function sendMessage() {
    const input = document.getElementById('chat-input');
    const message = input.value.trim();
    
    if (!message) return;
    
    // Добавить сообщение пользователя
    addMessage(message, true);
    input.value = '';
    
    // Получить ответ от AI
    const response = await aiTrainer.answerQuestion(message);
    addMessage(response, false);
}

// Обработка Enter в чате
document.getElementById('chat-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        sendMessage();
    }
});

// Функции для кнопок навигации
function scrollToTrainer() {
    document.querySelector('.trainer-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function scrollToChat() {
    document.querySelector('.chat-section').scrollIntoView({ 
        behavior: 'smooth' 
    });
}

function saveProgram() {
    const programText = document.getElementById('program-output').innerText;
    const blob = new Blob([programText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'моя_программа_тренировок.txt';
    a.click();
    URL.revokeObjectURL(url);
    
    alert('Программа сохранена!');
}
