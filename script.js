var badRoad = []
var borderPoints = []
var endMapPoints = []

// utworzenie tablicy z granicami trasy
const allBorders = document.querySelectorAll('[data-border]')
allBorders.forEach(singleBorderPoint => {
    let onePoint = {}
    const singlePoint = singleBorderPoint.getBoundingClientRect()

    onePoint.top = singlePoint.top
    onePoint.left = singlePoint.left

    borderPoints.push(onePoint)
})

//utworzenie tablicy z metą trasy
const endRoad = document.querySelectorAll('[data-end]')
endRoad.forEach(singleEndBlock => {
    let endPoint = {}
    const singlePointEnd = singleEndBlock.getBoundingClientRect()

    endPoint.top = singlePointEnd.top
    endPoint.left = singlePointEnd.left

    endMapPoints.push(endPoint)
})


const carThree = () => {

    const $car = document.querySelector('[data-car-second3]')
    const carSensor = document.querySelector('[data-car-sensor-second3]')
    const carSensorRight = document.querySelector('[data-car-sensor-right-second3]')
    const counterBoard = document.querySelector('[data-black]')

    $car.style.left = '75px'

    const roadDownValue = 1
    const roadRightValue = 7
    let roadDown1 = 0
    let roadRight1 = 75

    //ruch samochodu w dół
    const carRideDown = () => {
        roadDown1 += roadDownValue
        let tak = roadDown1.toString()
        $car.style.top = `${tak}px`
        // carView.style.transform = `rotate(${0}deg`
    }

    //ruch w prawo
    const carRideRight = () => {
        roadRight1 += roadRightValue
        let tak = roadRight1.toString()
        $car.style.left = `${tak}px`
        // carView.style.transform = `rotate(${-45}deg`
    }

    //ruch w lewo
    const carRideLeft = () => {
        roadRight1 -= roadRightValue
        let tak = roadRight1.toString()
        $car.style.left = `${tak}px`
        // carView.style.transform = `rotate(${45}deg`
    }

    const restartCarPosition = () => {
        // carView.style.transform = `rotate(${0}deg`
        let values = [75, 68, 82, 89, 61]

        min = Math.ceil(0);
        max = Math.floor(4);
        let number = Math.floor(Math.random() * (max - min)) + min;
        console.log(number)

        roadDown1 = 0
        roadRight1 = 75
        $car.style.top = `${0}px`
        $car.style.left = `${values[number]}px`
    }

    //zwraca aktualną dla interwalu lokalizacje auta
    const actualCarLocalisation = () => {
        let carLocalisation = {}
        const singleCarLocalisation = carSensor.getBoundingClientRect()

        carLocalisation.top = singleCarLocalisation.top
        carLocalisation.left = singleCarLocalisation.left

        return carLocalisation
    }

    //zwraca lokalizacje prawego czujnika
    const actualCarLocalisationRight = () => {
        let carLocalisation = {}
        const singleCarLocalisation = carSensorRight.getBoundingClientRect()

        carLocalisation.top = singleCarLocalisation.top
        carLocalisation.left = singleCarLocalisation.left

        return carLocalisation
    }
    console.log(endMapPoints)

    //zwraca true jezeli auto trafi na linię mety
    const endMap = (carLocalisation) =>{
        for(let i = 0; i < endMapPoints.length; i++){
            if(carLocalisation.top === endMapPoints[i].top && carLocalisation.left === endMapPoints[i].left){
                return true
            }
        }
    }

    //jezeli pojazd ma kolizję z granicą zwraca true
    const carCollisionWithBorders = (actualCarLoc) => {
        //ten pierwszy if mozna wywalic
        if (borderPoints.length > 1) {
            for (let i = 0; i < borderPoints.length; i++) {
                if (actualCarLoc.top === borderPoints[i].top && actualCarLoc.left === borderPoints[i].left) {
                    return true
                }
            }
        }
    }

    //sprawdza czy auto trafilo na wyryty wcześniej element granicy
    const carCollisionWithBadpoints = (actualCarLoc) => {
        //ten pierwszy if mozna wywalic
        if (badRoad.length > 0) {
            for (let i = 0; i < badRoad.length; i++) {
                if (actualCarLoc.top === badRoad[i].top && actualCarLoc.left === badRoad[i].left) {
                    return true
                } else {
                    // return false
                }
            }
        } else {
            return false
        }
    }

    let flag = true
    let counter = 0
    const ride = () => {
        flag = true

        //jezeli kolizja z zapamiętanym punktem skrec w lewo
        let aaa = actualCarLocalisationRight()
        if (carCollisionWithBadpoints(actualCarLocalisation())) {

            let flag2 = true

            //sprawdza dla prawego czujnika czy jest w takiej lokalizacji granica jezeli jest to jedzie w lewo jezeli nie to w prawo
            for (let i = 0; i < borderPoints.length; i++) {
                if (aaa.top === borderPoints[i].top && aaa.left === borderPoints[i].left) {
                    carRideLeft()
                    flag2 = false
                }
            }

            if (flag2) {
                carRideRight()
                flag2 = true
            }

            flag = false
        }

        //jezeli kolizja to skręć DZIALA - zapisywanie kolizyjnej lokalizacji i restart pozycji autka
        if (flag) {
            if (carCollisionWithBorders(actualCarLocalisation())) {
                ////jezeli kolizja to dodaj lokalizacje do tablicy zakazanych i cofnij na początek
                badRoad.push(actualCarLocalisation())
                restartCarPosition()
                counter += 1
            }
        }

        carRideDown()


        if (endMap(actualCarLocalisation())) {
            clearInterval(interval)
        }
        counterBoard.textContent = counter.toString()
    }

    let interval = setInterval(ride, 10)
}


const carTwo = () => {

    const $car = document.querySelector('[data-car-second]')
    const carSensor = document.querySelector('[data-car-sensor-second]')
    const carSensorRight = document.querySelector('[data-car-sensor-right-second]')
    const counterBoard = document.querySelector('[data-green]')

    $car.style.left = '75px'
    const roadDownValue = 1
    const roadRightValue = 7
    let roadDown1 = 0
    let roadRight1 = 75

    //ruch samochodu w dół
    const carRideDown = () => {
        roadDown1 += roadDownValue
        let tak = roadDown1.toString()
        $car.style.top = `${tak}px`
    }

    //ruch w prawo
    const carRideRight = () => {
        roadRight1 += roadRightValue
        let tak = roadRight1.toString()
        $car.style.left = `${tak}px`
    }

    //ruch w lewo
    const carRideLeft = () => {
        roadRight1 -= roadRightValue
        let tak = roadRight1.toString()
        $car.style.left = `${tak}px`
    }

    //restartuje samochod do pozycji startowej z randomowym położeniem
    const restartCarPosition = () => {

        let values = [75, 68, 82, 89, 61]

        min = Math.ceil(0);
        max = Math.floor(4);
        let number = Math.floor(Math.random() * (max - min)) + min;

        roadDown1 = 0
        roadRight1 = 75
        $car.style.top = `${0}px`
        $car.style.left = `${values[number]}px`
    }

    //zwraca aktualną dla interwalu lokalizacje auta
    const actualCarLocalisation = () => {
        let carLocalisation = {}
        const singleCarLocalisation = carSensor.getBoundingClientRect()

        carLocalisation.top = singleCarLocalisation.top
        carLocalisation.left = singleCarLocalisation.left

        return carLocalisation
    }

    //zwraca lokalizacje prawego czujnika
    const actualCarLocalisationRight = () => {
        let carLocalisation = {}
        const singleCarLocalisation = carSensorRight.getBoundingClientRect()

        carLocalisation.top = singleCarLocalisation.top
        carLocalisation.left = singleCarLocalisation.left

        return carLocalisation
    }

      //zwraca true jezeli auto trafi na linię mety
      const endMap = (carLocalisation) =>{
        for(let i = 0; i < endMapPoints.length; i++){
            if(carLocalisation.top === endMapPoints[i].top && carLocalisation.left === endMapPoints[i].left){
                return true
            }
        }
    }

    //jezeli pojazd ma kolizję z granicą zwraca true
    const carCollisionWithBorders = (actualCarLoc) => {
        //ten pierwszy if mozna wywalic
        if (borderPoints.length > 1) {
            for (let i = 0; i < borderPoints.length; i++) {
                if (actualCarLoc.top === borderPoints[i].top && actualCarLoc.left === borderPoints[i].left) {
                    return true
                }
            }
        }
    }

    //sprawdza czy autko trafilo na poznany juz element granicy
    const carCollisionWithBadpoints = (actualCarLoc) => {
        //ten pierwszy if mozna wywalic
        if (badRoad.length > 0) {
            for (let i = 0; i < badRoad.length; i++) {
                if (actualCarLoc.top === badRoad[i].top && actualCarLoc.left === badRoad[i].left) {
                    return true
                } 
            }
        } else {
            return false
        }
    }

    let flag = true
    let counter = 0
    const ride = () => {
        flag = true

        //jezeli kolizja z zapamiętanym punktem skrec w lewo
        let aaa = actualCarLocalisationRight()
        if (carCollisionWithBadpoints(actualCarLocalisation())) {

            let flag2 = true

            //sprawdza dla prawego czujnika czy jest w takiej lokalizacji granica jezeli jest to jedzie w lewo jezeli nie to w prawo
            for (let i = 0; i < borderPoints.length; i++) {
                if (aaa.top === borderPoints[i].top && aaa.left === borderPoints[i].left) {
                    carRideLeft()
                    flag2 = false
                }
            }

            if (flag2) {
                carRideRight()
                flag2 = true
            }

            flag = false
        }

        //jezeli kolizja to skręć DZIALA - zapisywanie kolizyjnej lokalizacji i restart pozycji autka
        if (flag) {
            if (carCollisionWithBorders(actualCarLocalisation())) {
                ////jezeli kolizja to dodaj lokalizacje do tablicy zakazanych i cofnij na początek
                badRoad.push(actualCarLocalisation())
                restartCarPosition()
                counter += 1
            }
        }

        carRideDown()

        if (endMap(actualCarLocalisation())) {
            clearInterval(interval)
        }
        counterBoard.textContent = counter.toString()

    }

    let interval = setInterval(ride, 15)
}

const carOne = () => {

    const $car = document.querySelector('[data-car]')
    const carSensor = document.querySelector('[data-car-sensor]')
    const carSensorRight = document.querySelector('[data-car-sensor-right]')
    const counterBoard = document.querySelector('[data-red]')

    $car.style.left = '75px'
    const roadDownValue = 1
    const roadRightValue = 7
    let roadDown1 = 0
    let roadRight1 = 75

    //ruch samochodu w dół
    const carRideDown = () => {
        roadDown1 += roadDownValue
        let tak = roadDown1.toString()
        $car.style.top = `${tak}px`
    }

    //ruch w prawo
    const carRideRight = () => {
        roadRight1 += roadRightValue
        let tak = roadRight1.toString()
        $car.style.left = `${tak}px`
    }

    //ruch w lewo
    const carRideLeft = () => {
        roadRight1 -= roadRightValue
        let tak = roadRight1.toString()
        $car.style.left = `${tak}px`
    }

    const restartCarPosition = () => {
        let values = [75, 68, 82, 89, 61]

        min = Math.ceil(0);
        max = Math.floor(4);
        let number = Math.floor(Math.random() * (max - min)) + min;

        roadDown1 = 0
        roadRight1 = 75
        $car.style.top = `${0}px`
        $car.style.left = `${values[number]}px`
    }

    //zwraca aktualną dla interwalu lokalizacje auta
    const actualCarLocalisation = () => {
        let carLocalisation = {}
        const singleCarLocalisation = carSensor.getBoundingClientRect()

        carLocalisation.top = singleCarLocalisation.top
        carLocalisation.left = singleCarLocalisation.left

        return carLocalisation
    }

    const actualCarLocalisationRight = () => {
        let carLocalisation = {}
        const singleCarLocalisation = carSensorRight.getBoundingClientRect()

        carLocalisation.top = singleCarLocalisation.top
        carLocalisation.left = singleCarLocalisation.left

        return carLocalisation
    }

      //zwraca true jezeli auto trafi na linię mety
      const endMap = (carLocalisation) =>{
        for(let i = 0; i < endMapPoints.length; i++){
            if(carLocalisation.top === endMapPoints[i].top && carLocalisation.left === endMapPoints[i].left){
                return true
            }
        }
    }

    //jezeli pojazd ma kolizję z granicą zwraca true
    const carCollisionWithBorders = (actualCarLoc) => {
        //ten pierwszy if mozna wywalic
        if (borderPoints.length > 1) {
            for (let i = 0; i < borderPoints.length; i++) {
                if (actualCarLoc.top === borderPoints[i].top && actualCarLoc.left === borderPoints[i].left) {
                    return true
                }
            }
        }
    }

    const carCollisionWithBadpoints = (actualCarLoc) => {
        //ten pierwszy if mozna wywalic
        if (badRoad.length > 0) {
            for (let i = 0; i < badRoad.length; i++) {
                if (actualCarLoc.top === badRoad[i].top && actualCarLoc.left === badRoad[i].left) {
                    return true
                }
            }
        } else {
            return false
        }
    }

    let flag = true
    let counter = 0
    const ride = () => {
        flag = true

        //jezeli kolizja z zapamiętanym punktem skrec w lewo
        let aaa = actualCarLocalisationRight()
        if (carCollisionWithBadpoints(actualCarLocalisation())) {

            let flag2 = true

            //sprawdza dla prawego czujnika czy jest w takiej lokalizacji granica jezeli jest to jedzie w lewo jezeli nie to w prawo
            for (let i = 0; i < borderPoints.length; i++) {
                if (aaa.top === borderPoints[i].top && aaa.left === borderPoints[i].left) {
                    carRideLeft()
                    flag2 = false
                }
            }

            if (flag2) {
                carRideRight()
                flag2 = true
            }

            flag = false
        }

        //jezeli kolizja to skręć DZIALA - zapisywanie kolizyjnej lokalizacji i restart pozycji autka
        if (flag) {
            if (carCollisionWithBorders(actualCarLocalisation())) {
                ////jezeli kolizja to dodaj lokalizacje do tablicy zakazanych i cofnij na początek
                badRoad.push(actualCarLocalisation())
                restartCarPosition()
                counter += 1
            }
        }

        carRideDown()
        if (endMap(actualCarLocalisation())) {
            clearInterval(interval)
        }

        counterBoard.textContent = counter.toString()
    }

    let interval = setInterval(ride, 20)
    console.log('car1')
}

carTwo()
carThree()
carOne()