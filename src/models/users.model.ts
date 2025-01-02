export type activityType = {
  date: string;
  user_activity: string;
  detail: string;
};

export class UsersModel {

  firstname: string;
  lastname: string;
  email: string;
  active_status: string;
  last_login: string;
  paid_status: string;
  paid_day: string;
  amount: string;
  activity: activityType[];

  constructor(
    firstname: string,
    lastname: string,
    email: string,
    active_status: string,
    last_login: string,
    paid_status: string,
    paid_day: string,
    amount: string,
    activity: activityType[],
  ) {
    this.firstname = firstname;
    this.lastname = lastname;
    this.email = email;
    this.active_status = active_status;
    this.last_login = last_login;
    this.paid_status = paid_status;
    this.paid_day = paid_day;
    this.amount = amount;
    this.activity = activity;
  }
}
