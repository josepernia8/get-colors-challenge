class Color {
	constructor(name) {
		this.name = name
	}
}

class Green extends Color {
	constructor() {
		super('green');
	}
}

class Blue extends Color {
	constructor() {
		super('blue');
	}
}

class Red extends Color {
  constructor() {
    super('red');
  }
}

class Black extends Color {
  constructor() {
    super('black');
  }
}

class White extends Color {
  constructor() {
    super('white');
  }
}

module.exports = { Green, Blue, Red, Black, White };
