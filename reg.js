const animParamPattern = /[.#\w\d:]+\{+[^{]+animation\-[^:]+:+[^;]+;+[^}]+\}/g // патерн для поиска анимаций в стилях

// псевдоклассы реагирующие на действие пользователя
const hoverPattern = /[^\n \}]+:hover+[^\}]+\}/g; // паттерн для навидений
const activePattern = /[^\n \}]+:active+[^\}]+\}/g; // паттерн для активных
const focusPatter = /[^\n \}]+:focus+[^\}]+\}/g // паттерн для фокуса