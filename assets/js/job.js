const userCardTemplate = document.querySelector('[data-user-template]')
const userCardContainer = document.querySelector('[data-user-cards=container]')
const searchInput = document.querySelector('[data-search]')

let user = []

searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase()
    users.forEach(user => {
        const isVisible = user.name.toLowerCase().includes(value) || user.email.toLowerCase().includes(value)
        user.element.classList.toggle('hide', !isVisible)
    });
})

fetch('https://remotive.io/api/remote-jobs?limit=200')
    .then(res => res.json())
    .then(data => {
        data = data.jobs
        users = data.map(user => {
            const card = userCardTemplate.content.cloneNode(true).children[0]
            const header = card.querySelector('[data-header]')
            const body = card.querySelector('[data-body]')
            const jobType = card.querySelector('[data-job-type]')
            header.textContent = user.company_name
            body.textContent = user.title
            jobType.textContent = user.job_type
            userCardContainer.append(card)
            return { name: user.company_name, email: user.title, job_type: user.job_type, element: card }
        });

    })