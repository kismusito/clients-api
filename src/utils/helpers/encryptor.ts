import * as bcrypt from "bcrypt";

export class TextEncrypt {
  private text: string;
  private rounds: number;

  constructor(text: string, rounds = 10) {
    this.text = text;
    this.rounds = rounds;
  }

  private genSalt() {
    return bcrypt.genSalt(this.rounds);
  }

  async encrypt(): Promise<string> {
    const salt = await this.genSalt();
    return bcrypt.hash(this.text, salt);
  }

  compare(hashText: string): Promise<boolean> {
    return bcrypt.compare(this.text, hashText);
  }
}
