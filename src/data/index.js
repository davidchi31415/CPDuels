const BACKEND_PORT = 8080;

export default class Database {  
  static async _getModel(model) {
    const response = await fetch(`http://localhost:${BACKEND_PORT}/${model}`).then(
      res => res.json()
    ).then(
      json => { return json; }
    ).catch(
      err => console.log(err)
    );
    return response;
  }

  static async getProblemById(db_id) {
    const problem = await this._getModel(`problem/${db_id}`);
    return problem;
  }
  static async getProblems(rating=null) {
    const problems = await this._getModel('problem').then(
      result => {
        return (rating === null) ? result : result.filter(problem => problem.rating === rating);
      }
    );
    return problems;
  }

  static async getUserById(db_id) {
    const user = await this._getModel(`user/${db_id}`);
    return user;
  }
  static async getUserByHandle(handle) {
    const user = await this._getModel('user').then(
      result => result.filter(user => user.handle === handle)
    );
    return user;
  }
  static async getUsers() {
    const users = await this._getModel('user');
    return users;
  }

  static async getDuelById(db_id) {
    const duel = await this._getModel(`duel/${db_id}`);
    return duel;
  }
  static async getDuelWaiting() {
    const duels = await this._getModel('duel').then(
      result => result.filter(duel => duel.status === "WAITING")
    );
    return duels;
  }
  static async getDuelOngoing() {
    const duels = await this._getModel('duel').then(
      result => result.filter(duel => duel.status === "ONGOING")
    );
    return duels;
  }
  static async getDuelFinished() {
    const duels = await this._getModel('duel').then(
      result => result.filter(duel => duel.status === "FINISHED")
    );
    return duels;
  }
  static async getDuels() {
    const duels = await this._getModel('duel');
    return duels;
  }

  static async addDuel(params) {
    const duel = await fetch(`http://localhost:${BACKEND_PORT}/duel/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(
      res => res.json()
    ).catch((err) => console.log(err));
    return duel;
  }
}