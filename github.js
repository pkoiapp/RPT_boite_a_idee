
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
