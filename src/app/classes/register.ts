export class Register {
  public fm: string;
  public tx: string;
  public date: Date;

  constructor(fm: string, tx: string) {
    this.fm = fm;
    this.tx = tx;
    this.date = new Date();
  }
}
