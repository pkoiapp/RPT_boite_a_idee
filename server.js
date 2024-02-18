//import {saveThemeOctokit} from './github.js';
      
      let idTheme;
      let dateCreation;
      let f;
      let bddJSON;
      let sha; //recuperation du code github


      const monHeader = {
        headers: {
            'Accept': 'application/vnd.github+json',
            'Authorization' : 'Bearer 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',
            'X-GitHub-Api-Version': '2022-11-28',
            'Content-Type': 'application/json',
            'Cookie': '_octo=GH1.1.722999692.1707998846; logged_in=no'
            }
      }

      function readSHA(){

        fetch('https://api.github.com/repos/pkoiapp/RPT_boite_a_idee/contents/bddTheme.json', {
          method: 'GET',
          monHeader
        })
        .then(res=>res.json()
          .then(json=>{
            sha = json.sha
            //console.log(sha)
          })
        )
        
      }
      
      function addIdee(idTheme){
        document.getElementById(idTheme).insertAdjacentHTML("beforeend", 
          '<div class="Idea" id="'+ Date.now() +'">' +
            //'<input type="checkbox" style="background-color: white;">' +
            '<textarea placeholder="Idée ici..." class="IdeaID item"></textarea>' +
            '<div class="edition">' +
              '<i class="si-disk" style="color: #333635; font-size: 18px;" onclick="saveIdee('+ Date.now() +')"></i>' +
              '<i class="si-info-circle" style="color: #333635; font-size: 18px;"></i>' +
              '<i class="si-trash" style="color: #333635; font-size: 18px;" onclick="delIdee('+ Date.now() +')"></i>' +
            '</div>'+
          '</div>') ;      
      }

      function delIdee(idTheme){
        document.getElementById(idTheme).style.display = 'none';
      }

      function saveIdee(id){
         
        /*f = File.new()
        f.open("./bddIdea.json", File.WRITE)
        f.store_string(JSON.print(data, "  ", true))
        f.close()*/


      }

      function saveTheme(idTheme){
          console.log(bddJSON)

          bddJSON.forEach(element => {
            if (element.themeId == idTheme){
              element.themeContent = document.getElementById('text' + idTheme).value
            }
          });

          console.log(bddJSON)
          console.log(btoa(bddJSON))
        
          fetch('https://api.github.com/repos/pkoiapp/RPT_boite_a_idee/contents/bddTheme.json', {
          method: 'PUT',
          monHeader,
          body: {
                  'message': 'theme modifié',
                  'committer': {
                      'name': 'RPT',
                      'email': 'rpt@github.com'
                  },
                  'content': btoa(bddJSON),
                  'sha': sha
                }
        })
        .then(res=>res.json()
          .then(json=>{
            //sha = json.content.sha
            //console.log(sha)
          })
        )

      }

      function addTheme(){
        idTheme = Date.now()
        dateCreation = new Date(Date.now())
        document.getElementById('content').insertAdjacentHTML("beforeend", 
          '<div class="contentTheme" id="' + idTheme + '"">' +
            '<div class="Theme">' +
              //'<input type="checkbox" id="checkThemeID" style="background-color: white;">' +
              '<input type="text" placeholder="Thème ici...'+ dateCreation.getMinutes() +'" id="text'+ idTheme +'" class="item themeID">' +
              '<button class="mainbtn subbtn saveThemebtn" id="saveTheme'+ idTheme +'"" onclick="saveTheme(' + idTheme + ')"><i class="si-disk" style="color: #333635; font-size: 16px;"></i></button>' +
              '<button class="mainbtn subbtn addIdeabtn" id="addIdea'+ idTheme +'"" onclick="addIdee('+ idTheme +')"><i class="si-plus-circle" style="color: #333635; font-size: 16px;"></i></button>' +
              '<button class="mainbtn subbtn delIdeabtn" id="delTheme'+ idTheme +'"" onclick="delTheme('+ idTheme +')"><i class="si-trash" style="color: #333635; font-size: 16px;"></i></button>' +
          '</div>') ;         
      }

      function delTheme(idTheme){
        let text = "Supprimer le thème: " + document.getElementById('text'+idTheme).value + " ?" ;
        if (confirm(text) == true) {
          document.getElementById(idTheme).style.display = 'none';
        }         
      }

      window.onload = function() {
        //mise à jour des thèmes
        fetch('./bddTheme.json')
          .then(res=>res.json()
          .then(json=>{
            bddJSON = json
            json.map(data=>{
              //console.log(data.themeId, data.themeDate)
              document.getElementById('content').insertAdjacentHTML("beforeend", 
              '<div class="contentTheme" id="' + data.themeId + '">' +
                '<div class="Theme">' +
                  //'<input type="checkbox" id="checkThemeID" style="background-color: white;">' +
                  //placeholder="' + data.themeContent + '
                  '<input type="text" " id="text'+ data.themeId +'" class="item themeID" value="' + data.themeContent + '">' +
                  '<button class="mainbtn subbtn saveThemebtn" id="saveTheme'+ data.themeId +'" onclick="saveTheme(' + data.themeId + ')"><i class="si-disk" style="color: #333635; font-size: 16px;"></i></button>' +
                  '<button class="mainbtn subbtn addIdeabtn" id="addIdea'+ data.themeId +'" onclick="addIdee(' + data.themeId + ')"><i class="si-plus-circle" style="color: #333635; font-size: 16px;"></i></button>' +
                  '<button class="mainbtn subbtn delIdeabtn" id="delTheme'+ data.themeId +'" onclick="delTheme(' + data.themeId + ')"><i class="si-trash" style="color: #333635; font-size: 16px;"></i></button>' +
              '</div>') ;
            })
          })
        )
        //mise à jour des idées
        fetch('./bddIdea.json')
          .then(res=>res.json()
          .then(json=>{
            json.map(data=>{
              //console.log(data.themeId, data.ideaID, data.ideaContent)
              document.getElementById(data.themeId).insertAdjacentHTML("beforeend", 
              '<div class="Idea" id="'+ data.ideaID +'">' +
                //'<input type="checkbox" style="background-color: white;">' +
                '<textarea class="IdeaID item" id="textIdea'+ data.ideaID +'">'+ data.ideaContent +'</textarea>' +
                '<div class="edition">' +
                  '<i class="si-disk" style="color: #333635; font-size: 16px;" onclick="saveIdee('+ data.ideaID +')"></i>' +
                  '<i class="si-info-circle" style="color: #333635; font-size: 16px;"></i>' +
                  '<i class="si-trash" style="color: #333635; font-size: 16px;" onclick="delIdee('+ data.ideaID +')"></i>' +
                '</div>'+
              '</div>') ;
            })
          })
        )
        
        //recuperation code hachage fichier github 
        readSHA()
      }
