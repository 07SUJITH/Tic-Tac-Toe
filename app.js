const gameboard = document.querySelector('#gameboard');
const infoDisplay = document.querySelector('#info');
const greeting = document.querySelector('#greeting')
const reloadButton = document.querySelector("#reloadButton")

const startCells = [
    "","","","","","","","",""
]
let go = 'circle'
infoDisplay.textContent = "Circle goes first"

const createBoard = ()=>{
    startCells.forEach((cell,index)=>{
        const cellElement =  document.createElement('div')
        cellElement.classList.add('square')
        cellElement.id = index 
        cellElement.addEventListener('click',addGo)
        gameboard.appendChild(cellElement)
    })
}
createBoard()

function addGo(e){
        const goDisplay = document.createElement('div')
        goDisplay.classList.add(go)
        e.target.append(goDisplay)
        go = go === "circle" ? "cross" : "circle"
        infoDisplay.textContent = `it is now ${go} 's go.`
        e.target.removeEventListener('click', addGo)
        checkScore()   
}

function checkScore(){

    const allSquares = document.querySelectorAll(".square");
    const winningCombo = [
        [0,1,2],[3,4,5],[6,7,8],
        [0,3,6],[1,4,7],[2,5,8],
        [0,4,8],[2,4,6]
    ]
    winningCombo.forEach( array => {
       const circleWins =  array.every( cell =>allSquares[cell].firstChild?.classList.contains('circle'))

        if(circleWins){
            infoDisplay.textContent = "Circle Wins ! "
            infoDisplay.classList.add("win")
            greeting.textContent = "You're on fire!"
            greeting.classList.add("fire")
            reloadButton.textContent = "Restart Game"
            reloadButton.style.display = "block";
            allSquares.forEach(square =>{
                square.removeEventListener('click',addGo)})
            return
        }
    })

    winningCombo.forEach( array => {
       const crossWins =  array.every(cell =>
        allSquares[cell].firstChild?.classList.contains('cross'))
        if(crossWins){
            infoDisplay.textContent = "Cross Wins !"
            infoDisplay.classList.add("win")
            greeting.textContent = "You're on fire!"
            greeting.classList.add("fire")
            reloadButton.textContent = " Restart Game"
            reloadButton.style.display = "block";
            allSquares.forEach(square =>{
                square.removeEventListener('click',addGo)})
            return
        }
    })
   

}
reloadButton.addEventListener('click' , ()=>{location.reload();})