export const walkClass = (superclass) =>
  class extends superclass {
    walk() {
      console.log(`My name is ${this.name}, and I can walk`)
    }
  }

export const swimmerClass = (superclass) =>
  class extends superclass {
    swim() {
      console.log(`My name is ${this.name}, and I can swim`)
    }
  }

export const flierClass = (superclass) =>
  class extends superclass {
    fly() {
      console.log(`My name is ${this.name}, and I can fly`)
    }
  }

export const attackerClass = (superclass) =>
  class extends superclass {
    attack() {
      console.log(`My name is ${this.name}, and I can attack`)
    }
  }
