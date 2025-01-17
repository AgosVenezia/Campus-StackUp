enum State {
  On, // 0
  Off, // 1
}

const status: State = State.On;

console.log(status);
console.log(State.Off);

enum CustomState {
  On = "Activated",
  Off = "Deactivated",
}

const customStatus: CustomState = CustomState.Off;
console.log(customStatus);

enum CrazyEnum {
  Off = 15,
  On = "true",
}

const crazyVar: CrazyEnum = CrazyEnum.On;
console.log(crazyVar, CrazyEnum.Off);
