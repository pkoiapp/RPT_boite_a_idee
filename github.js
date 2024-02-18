
import { Octokit } from "https://esm.sh/@octokit/core";

const octokit = new Octokit({
                auth: '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'
              })

document.getElementById("saveAll").addEventListener("click", function() {
  saveThemeOctokit()
});

export function saveThemeOctokit(){
      
    console.log(bddJSON)
      bddJSON.forEach(element => {
        //if (element.themeId == idTheme){
          element.themeContent = document.getElementById('text' + element.themeId).value
        //}
      });

      console.log(bddJSON)

    octokit.request('PUT /repos/{owner}/{repo}/contents/{path}', {
      owner: 'pkoiapp',
      repo: 'RPT_boite_a_idee',
      path: 'bddTheme.json',
      message: 'my commit message',
      
      committer: {
        name: 'Monalisa Octocat',
        email: 'octocat@github.com'
      },
      content: btoa(bddJSON),
      sha: sha,
      headers: {
        'X-GitHub-Api-Version': '2022-11-28'
      }
    })


    console.log(sha)
}
