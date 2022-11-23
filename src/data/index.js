import backendOrigin from "../config/origins";
import uuid from 'react-uuid';

export default class Database {  
  static async _getModel(model) {
    const response = await fetch(`${backendOrigin}/${model}`)
    .then(
      res => res.json()
    ).then(
      json => { return json; }
    ).catch(
      err => {
        console.log(err);
      }
    );
    return response;
  }

  static async getProblemById(db_id) {
    const problem = await this._getModel(`problems/${db_id}`);
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
    const user = await this._getModel(`users/${db_id}`);
    return user;
  }
  static async getUserByUsername(username) {
    const user = await this._getModel('user').then(
      result => result.filter(user => user.username === username)
    );
    return user;
  }
  static async getUsers() {
    const users = await this._getModel('user');
    return users;
  }

  static async getDuelById(db_id) {
    const duel = await this._getModel(`duels/${db_id}`);
    return duel;
  }
  static async getDuelsWaiting() {
    const duels = await this._getModel('duels').then(
      result => result.filter(duel => (duel.status === "WAITING"))
    );
    return duels;
  }
  static async getDuelsWaitingPublic() { // Only gets the public waiting duels
    const duels = await this._getModel('duels').then(
      result => result.filter(duel => (duel.status === "WAITING" && !duel.private))
    );
    return duels;
  }
  static async getDuelsOngoing() {
    const duels = await this._getModel('duels').then(
      result => result.filter(duel => duel.status === "ONGOING")
    );
    return duels;
  }
  static async getDuelsOngoingPublic() { // Only gets the public ongoing duels
    const duels = await this._getModel('duels').then(
      result => result.filter(duel => duel.status === "ONGOING" && !duel.private)
    );
    return duels;
  }
  static async getDuelsReady() {
    const duels = await this._getModel('duels').then(
      result => result.filter(duel => duel.status === "READY")
    );
    return duels;
  }
  static async getDuelsReadyPublic() { // Only gets the public ready duels
    const duels = await this._getModel('duels').then(
      result => result.filter(duel => duel.status === "READY" && !duel.private)
    );
    return duels;
  }
  static async getDuelsFinished() {
    const duels = await this._getModel('duels').then(
      result => result.filter(duel => duel.status === "FINISHED")
    );
    return duels;
  }
  static async getDuelsFinishedPublic() { // Only gets the public finished duels
    const duels = await this._getModel('duels').then(
      result => result.filter(duel => duel.status === "FINISHED" && !duel.private)
    );
    return duels;
  }
  static async getDuels() {
    const duels = await this._getModel('duels');
    return duels;
  }

  static async getSubmissionsByDuelId(id) {
    const filteredSubmissions = await this.getSubmissions().then(
      result => result?.filter(submission => submission.duelId === id)
    );
    return filteredSubmissions;
  }
  static async getSubmissionsByDuelIdAndUid(id, uid) {
    const filteredSubmissions = await this.getSubmissions().then(
      result => result?.filter(submission => submission.duelId.toString() === id && submission.uid === uid)
    );
    return filteredSubmissions;
  }
  static async getSubmissions() {
    const submissions = await this._getModel('submissions');
    return submissions;
  }

  static async addDuel(params) {
    const duel = await fetch(`${backendOrigin}/duels/add`, {
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

  static async addPlayer() {
    const player = await fetch(`${backendOrigin}/players/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      }
    }).then(
      res => res.json()
    ).catch((err) => console.log(err));
    return player;
  }
}

export const handleUID = () => {
  let uid = localStorage.getItem('uid');
  if (!uid) {
      uid = uuid();
      localStorage.setItem('uid', uid);
  }
}
