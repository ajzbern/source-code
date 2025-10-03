// import { Octokit } from "octokit";
// export const getAllRepos = async (token: string) => {
//   const octokit = new Octokit({
//     auth: token,
//   });
//   const repos = await octokit.rest.repos.listForAuthenticatedUser({
//     type: "all",
//     per_page: 100,
//     sort: "updated",
//   });
//   console.log(repos);
//   return repos.data;
// };

// export const createRepo = async (
//   name: string,
//   description: string,
//   token: string
// ) => {
//   const octokit = new Octokit({
//     auth: token,
//   });

//   const repo = await octokit.rest.repos.createForAuthenticatedUser({
//     name,
//     description: description,
//     private: true,
//   });
//   return repo;
// };

// export const getRepo = async (
//   repoName: string,
//   owner: string,
//   token: string
// ) => {
//   const octokit = new Octokit({
//     auth: token,
//   });
//   const repo = await octokit.rest.repos.get({
//     owner,
//     repo: repoName,
//   });
//   return repo;
// };
// export const getRepoContributors = async (
//   repoName: string,
//   owner: string,
//   token: string
// ) => {
//   const octokit = new Octokit({
//     auth: token,
//   });
//   const contributors = await octokit.rest.repos.listContributors({
//     owner,
//     repo: repoName,
//   });
//   return contributors;
// };

// export const addCollaborator = async (
//   repoName: string,
//   owner: string,
//   username: string,
//   token: string
// ) => {
//   const octokit = new Octokit({
//     auth: token,
//   });
//   const collaborator = await octokit.rest.repos.addCollaborator({
//     owner,
//     repo: repoName,
//     username,
//   });
//   return collaborator;
// };

// export const removeCollaborator = async (
//   repoName: string,
//   owner: string,
//   username: string,
//   token: string
// ) => {
//   const octokit = new Octokit({
//     auth: token,
//   });

//   const collaborator = await octokit.rest.repos.removeCollaborator({
//     owner,
//     repo: repoName,
//     username,
//   });
//   return collaborator;
// };
