class Car {
    brand;
    model;
    speed = 0;
    isTrunkOpen = false;

    constructor(brand, model) {
        this.brand = brand;
        this.model = model;
    }

    go() {
        if (this.speed < 200 && this.isTrunkOpen === false) this.speed += 5;
    }

    brake() {
        if (this.speed > 0) this.speed -= 5;
    }

    openTrunk() {
        if (this.speed === 0) this.isTrunkOpen = true;
    }

    closeTrunk() {
        this.isTrunkOpen = false;
    }

    displayInfo() {
        console.log(`${this.brand}, ${this.model}, Speed: ${this.speed}km/h, Trunk Open: ${this.isTrunkOpen}`);
    }
}

class Racecar extends Car {
    acceleration;

    constructor(brand, model, acceleration) {
        super(brand, model);
        this.acceleration = acceleration;
    }

    go() {
        if (this.speed < 300) this.speed += this.acceleration;
    }

    openTrunk() {
        return;
    }

    closeTrunk() {
        return;
    }

    displayInfo() {
        console.log(`${this.brand}, ${this.model}, Speed: ${this.speed}km/h, Acceleration: ${this.acceleration}`);
    }

}

const car = new Car("Honda", "Civic");
car.go();
car.brake();
car.openTrunk();
car.closeTrunk();
car.go();
car.go();
car.brake();
car.displayInfo();

const racecar = new Racecar("Mclaren", "F1", 20);
racecar.go();
racecar.go();
racecar.brake();
racecar.go();
racecar.displayInfo();