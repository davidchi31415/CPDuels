import backendOrigin from "../config/origins";
import uuid from 'react-uuid';

export default class Database {  
  static async _getModel(model, params) {
    let time = Date.now();
    const response = await fetch(`${backendOrigin}/${model}`, params)
    .then(
      res => res.json()
    ).then(
      json => { return json; }
    ).catch(
      err => {
        console.log(err);
      }
    );
    console.log((Date.now() - time) / 1000);
    return response;
  }

  static async getCFProblemById(db_id) {
    const problem = await this._getModel(`cfproblems/${db_id}`);
    return problem;
  }
  static async getCFProblems(rating=null) {
    const problems = await this._getModel('cfproblem').then(
      result => {
        return (rating === null) ? result : result.filter(problem => problem.rating === rating);
      }
    );
    return problems;
  }

  static async getLCProblemById(db_id) {
    const problem = await this._getModel(`lcproblems/${db_id}`);
    return problem;
  }
  static async getLCProblems(difficulty=null) {
    const problems = await this._getModel('lcproblem').then(
      result => {
        return (difficulty === null) ? result : result.filter(problem => problem.difficulty === difficulty);
      }
    );
    return problems;
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

  static async checkIfUserInDuel() {
    let uid = getUID();
    const duels = await this._getModel(`general/playercurrentduels/${uid}`);
    return duels;
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
  static async getDuelsInitialized() {
    const duels = await this._getModel('duels').then(
      result => result.filter(duel => duel.status === "INITIALIZED")
    );
    return duels;
  }
  static async getDuelsInitializedPublic() { // Only gets the public initialized duels
    const duels = await this._getModel('duels').then(
      result => result.filter(duel => duel.status === "INITIALIZED" && !duel.private)
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
    let res = await this._getModel(`general/playerduelsubmissions/${id}`);
    if (res?.submissions) return res.submissions;
    else console.log("Couldn't get submissions.");
    return [];
  }
  static async getSubmissionsByDuelIdAndUid(id, uid) {
    let res = await this._getModel(`general/playerduelsubmissions/${id}/${uid}`);
    if (res?.submissions) return res.submissions;
    else console.log("Couldn't get submissions.");
    return [];
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

  static async addMessage(params) {
    const message = await fetch(`${backendOrigin}/messages/add`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(params)
    }).then(
      res => res.json()
    ).catch((err) => console.log(err));
    return message;
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

export const getUID = () => {
  handleUID();
  let uid = localStorage.getItem('uid');
  return uid;
}