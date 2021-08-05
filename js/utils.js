const creator = (creatingElement, parent = document) => parent.createElement(creatingElement);
const selector = (gettingElement, parent = document) => parent.querySelector(gettingElement)

let timeMaker = (time => {
    const day = String(new Date(time).getDate()).padStart(2, '0');
    const month = String(new Date(time).getMonth() + 1).padStart(2, '0');
    const year = new Date(time).getFullYear();

    return day + '.' + month + '.' + year
})