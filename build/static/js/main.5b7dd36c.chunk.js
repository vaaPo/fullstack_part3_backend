(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{19:function(e,t,n){e.exports=n(47)},25:function(e,t,n){},47:function(e,t,n){"use strict";n.r(t);var o=n(0),a=n.n(o),r=n(11),s=n.n(r),l=(n(25),n(2)),i=n(3),u=n(5),c=n(4),m=n(6),p=n(1),h=n(7),d=n.n(h),g="https://restcountries.eu/rest/v2/all?fields=name;capital;population;flag;alpha3Code",f=function(){return d.a.get(g).then(function(e){return e.data})},b=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){console.log("FormCountriesByString componentDidMount")}},{key:"componentWillUnmount",value:function(){console.log("FormCountriesByString componentWillUnmount")}},{key:"render",value:function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement("form",{onChange:this.searchCountry},a.a.createElement("label",null,a.a.createElement("b",null,"FormCountriesByString:"),a.a.createElement("input",{name:"FormCountriesByStringInput",type:"text",value:this.props.value,onChange:this.props.onChangeValue})),a.a.createElement("br",null),"debug this.props.value: ",this.props.value))}}]),t}(a.a.Component),v=n(17),P=n.n(v),C=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).state={showdetail:!1},console.log("CountryRow - loading"),console.log("CountryRow - props",e),n.handleClick=n.handleClick.bind(Object(p.a)(Object(p.a)(n))),n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){console.log("CountryRow did mount")}},{key:"componentWillUnmount",value:function(){console.log("CountryRow componentWillUnmount")}},{key:"handleClick",value:function(){this.setState(function(e){return{showdetail:!e.showdetail}}),console.log("PUM",this.state.showdetail)}},{key:"render",value:function(){var e=this.props.country,t=this.props.responsedatalength,n=a.a.createElement(a.a.Fragment,null,e.name),o=a.a.createElement(a.a.Fragment,null,e.alpha3Code),r=a.a.createElement(a.a.Fragment,null,a.a.createElement("b",null,"capital:")," ",e.capital),s=a.a.createElement(a.a.Fragment,null,a.a.createElement("b",null,"population:")," ",e.population),l=a.a.createElement(P.a,{onClick:this.handleClick,src:e.flag,height:50,width:100});return console.log("CountryRow render this.state.showdetail",this.state.showdetail),1===t||!0===this.state.showdetail?a.a.createElement("div",{id:"detailcountryname",className:"rowname",key:e.alpha3Code,onClick:this.handleClick},n,a.a.createElement("div",{id:"capital",onClick:this.handleClick},r,a.a.createElement("div",{id:"population",onClick:this.handleClick},s,a.a.createElement("div",{id:"alpha3",onClick:this.handleClick},o),a.a.createElement("div",{id:"flag"},l)))):a.a.createElement("div",{id:"rowcountryname",className:"rowname",key:e.alpha3Code,onClick:this.handleClick},e.name)}}]),t}(a.a.Component);console.log("FilterCountriesByString.js - loading");var E=function(e){var t=e.searchstring,n=e.countries;console.log("FilterCountriesByString searchstring",t);var o=n.filter(function(e){return e.name.toUpperCase().includes("\xc5")});console.log(o);var r=n.filter(function(e){return e.name.toUpperCase().includes(t)}),s=r.length;return console.log("FCBS searchstring:",t,"and hitcount as hit.length",s),s<11?a.a.createElement(a.a.Fragment,null,a.a.createElement("b",null,"FilterCountriesByString (click on country/flag... to toggle details!):"),t,r.map(function(e){return a.a.createElement(C,{key:e.alpha3Code,country:e,responsedatalength:s})})):a.a.createElement("p",null,"too many rows, refine search")},k=function(e){var t=e.message;return null===t?null:a.a.createElement("div",{className:"error"},t)},y=function(e){var t=e.message;return null===t?null:a.a.createElement("div",{className:"noerror"},t)},j=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).handleFormCountriesByString=function(e){console.log(e.target.value),n.setState({value:e.target.value.toUpperCase(),newsearchCountry:e.target.value.toUpperCase()})},n.state={countries:[],newsearchCountry:"",value:"",responsedatalength:"",error:null,noerror:null},console.log("AppCountries constructor"),n.handleFormCountriesByString=n.handleFormCountriesByString.bind(Object(p.a)(Object(p.a)(n))),n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log("AppCountries did mount"),f().then(function(t){e.setState({countries:t,noerror:"countriesTAPI getAllpromised gets countries to you!"}),setTimeout(function(){e.setState({noerror:null})},5e3)})}},{key:"componentWillUnmount",value:function(){console.log("AppCountries componentWillUnmount")}},{key:"render",value:function(){console.log("AppCountries render");var e=this.state.countries,t=this.state.countries.length;return console.log("AppCountries render responsedatalength",t),console.log("AppCountries fetchedcountries",e),a.a.createElement("div",{id:"AppCountries"},a.a.createElement("h4",null,"AppCountries for HW2.13"),a.a.createElement("p",null,"uses axios to fetch countries from restcountries.eu"),a.a.createElement("p",null,"components: FilterCountriesByString, FormCountriesByString"),a.a.createElement(y,{message:this.state.noerror}),a.a.createElement(k,{message:this.state.error}),a.a.createElement(b,{value:this.state.value,onChangeValue:this.handleFormCountriesByString}),a.a.createElement("div",{id:"FilterCountriesByString"},a.a.createElement(E,{searchstring:this.state.newsearchCountry,countries:this.state.countries})))}}]),t}(a.a.Component),w=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){console.log("FormPersonsByString componentDidMount")}},{key:"componentWillUnmount",value:function(){console.log("FormPersonsByString componentWillUnmount")}},{key:"render",value:function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement("form",{onChange:this.searchPerson},a.a.createElement("label",null,a.a.createElement("b",null,"FormPersonsByString:"),a.a.createElement("input",{name:"FormPersonsByStringInput",type:"text",value:this.props.value,onChange:this.props.onChangeValue})),a.a.createElement("br",null),"debug this.props.value: ",this.props.value))}}]),t}(a.a.Component),O=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).state={deleteId:null},console.log("PersonRow constructor"),n.onPersonClick=n.onPersonClick.bind(Object(p.a)(Object(p.a)(n))),n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){console.log("PersonRow componentDidMount"),console.log("PersonRow props",this.props)}},{key:"componentWillUnmount",value:function(){console.log("PersonRow componentWillUnmount")}},{key:"onPersonClick",value:function(e){alert("PersonRow onPersonClick for this.props.person.id "+e),console.log("this.onPersonClick",e)}},{key:"render",value:function(){var e=this,t="cell-"+this.props.person.id+"-0",n="cell-"+this.props.person.id+"-1",o="cell-"+this.props.person.id+"-2",r="cell-"+this.props.person.id+"-3",s="persondelbutton"+this.props.person.id,l="personrowxxx"+this.props.person.id;return a.a.createElement(a.a.Fragment,null,a.a.createElement("tr",{id:l,key:l},a.a.createElement("td",{id:t,key:t},this.props.person.id),a.a.createElement("td",{id:n,key:n},this.props.person.phonenumber),a.a.createElement("td",{id:o,key:o},this.props.person.name),a.a.createElement("td",{id:r,key:r},a.a.createElement("button",{id:s,key:s,type:"submit",className:"button button3",onClick:function(){return e.props.onPersonClick(e.props.person.id)}},"del"))))}}]),t}(a.a.Component),F="https://mysterious-fjord-82967.herokuapp.com/api/persons",S={getAllpromised:function(){return d.a.get(F).then(function(e){return e.data})},createpromised:function(e){return d.a.post(F,e).then(function(e){return e.data})},updatepromised:function(e,t){return d.a.put("".concat(F,"/").concat(e),t).then(function(e){return e.data})},deletepromised:function(e){return d.a.delete("".concat(F,"/").concat(e)).then(function(e){return e.data})}};console.log("FilterPersonsByString.js - loading");var A=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).state={deleteId:null,noerror:null,error:null,speissi:"\xa0"},console.log("PersonRow constructor"),n.onPersonClickDel=n.onPersonClickDel.bind(Object(p.a)(Object(p.a)(n))),n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){console.log("PersonRow componentDidMount"),console.log("PersonRow props",this.props)}},{key:"componentWillUnmount",value:function(){console.log("PersonRow componentWillUnmount")}},{key:"onPersonClickDel",value:function(e,t){var n=this;if(window.confirm("Do you really want to delete this person.id: "+e)){var o="Deleted:"+this.state.speissi+t;console.log("FPBS onPersonClickDel for id ",e,"name:",t),S.deletepromised(e).then(function(t){n.props.onPersonClickDel(e),n.setState({noerror:o}),setTimeout(function(){n.setState({noerror:null})},5e3)})}}},{key:"render",value:function(){var e=this,t=[];t=null!==this.props.searchstring?this.props.persons.filter(function(t){return t.name.toUpperCase().includes(e.props.searchstring)}):this.props.persons,console.log("FPBS searchstring",this.props.searchstring),console.log("FPBS persons",this.props.persons),console.log("FPBS hit",t);return a.a.createElement(a.a.Fragment,null,a.a.createElement("br",null),a.a.createElement("b",null,"FilterPersonsByString:"),this.props.searchstring,a.a.createElement(y,{message:this.state.noerror}),a.a.createElement(k,{message:this.state.error}),a.a.createElement("table",{id:"filterpersontable",key:"filterpersontable"},a.a.createElement("tbody",{id:"filterpersontbody",key:"filterpersontbody"},a.a.createElement("tr",{id:"filterpersontableheader",key:"filterpersontableheader"},a.a.createElement("th",{id:"FPBS-TH-0",key:"FPBS-TH-0"},"person.id"),a.a.createElement("th",{id:"FPBS-TH-1",key:"FPBS-TH-1"},"phonenumber"),a.a.createElement("th",{id:"FPBS-TH-2",key:"FPBS-TH-2"},"name"),a.a.createElement("th",{id:"FPBS-TH-3",key:"FPBS-TH-3"},"buttons")),t.map(function(t){return a.a.createElement(O,{key:t.id,person:t,onPersonClick:function(){return e.onPersonClickDel(t.id,t.name)}})}))))}}]),t}(a.a.Component),B=function(e){function t(){return Object(l.a)(this,t),Object(u.a)(this,Object(c.a)(t).apply(this,arguments))}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){console.log("FormPersonAdd componentDidMount")}},{key:"componentWillUnmount",value:function(){console.log("FormPersonAdd componentWillUnmount")}},{key:"render",value:function(){return a.a.createElement(a.a.Fragment,null,a.a.createElement("h3",null,"FormPersonAdd"),a.a.createElement("form",{onSubmit:this.props.onSubmit},a.a.createElement("label",null,"name:",a.a.createElement("input",{name:"addPersonInput",type:"text",value:this.props.ValuePerson,onChange:this.props.onChangeValuePerson})),a.a.createElement("p",null,a.a.createElement("label",null,"phonenumber:",a.a.createElement("input",{name:"addPhonenumberInput",type:"text",value:this.props.ValuePhonenumber,onChange:this.props.onChangeValuePhonenumber}))),a.a.createElement("button",{type:"submit"},"FormPersonAdd tallenna person")))}}]),t}(a.a.Component),T=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).addPerson=function(e){e.preventDefault();var t="Added:"+n.state.speissi+n.state.newFormPerson,o=n.state.persons.find(function(e){return e.name===n.state.newPerson});if(void 0===o){console.log(o),alert("addPerson submitted:"+n.state.speissi+n.state.newPerson+n.state.speissi+"with phonenumber"+n.state.speissi+n.state.newPhonenumber);var a={name:n.state.newPerson,phonenumber:n.state.newPhonenumber};S.createpromised(a).then(function(e){n.setState({newPerson:"",newPhonenumber:"",noerror:t}),n.refreshPersons(),setTimeout(function(){n.setState({noerror:null})},5e3)})}},n.handlePersonChange=function(e){console.log(e.target.value),n.setState({newPerson:e.target.value})},n.handlePhonenumberChange=function(e){console.log(e.target.value),n.setState({newPhonenumber:e.target.value})},n.addFormPerson=function(e){e.preventDefault();var t="Added:"+n.state.speissi+n.state.newFormPerson;alert("addFormPerson submitted:"+n.state.speissi+n.state.newFormPerson+n.state.speissi+"with phonenumber:"+n.state.speissi+n.state.newFormPhonenumber);var o=n.state.persons.find(function(e){return e.name===n.state.newFormPerson});if(void 0===o){console.log(o);var a={name:n.state.newFormPerson,phonenumber:n.state.newFormPhonenumber};S.createpromised(a).then(function(e){n.setState({newFormPerson:"",newFormPhonenumber:"",ValueFormPerson:"",ValueFormPhonenumber:"",noerror:t}),console.log("addFormPerson added via TAPI"),setTimeout(function(){n.setState({noerror:null})},5e3),n.refreshPersons()})}else if(alert("duplicate.name:"+n.state.speissi+o.name+n.state.speissi+"duplicate.id:"+n.state.speissi+o.id+n.state.speissi+"duplicate.phonenumber:"+n.state.speissi+o.phonenumber),window.confirm(o.name+n.state.speissi+"Is already in Phonebook, do you want to update the phonenumber?")){var r={name:n.state.newFormPerson,phonenumber:n.state.newFormPhonenumber};n.updatePerson(o.id,r)}},n.handleChangeValueFormPerson=function(e){console.log("hCVFormP",e.target.value),n.setState({newFormPerson:e.target.value})},n.handleChangeValueFormPhonenumber=function(e){console.log("hCVFormPn",e.target.value),n.setState({newFormPhonenumber:e.target.value})},n.handlesearchPersonChange=function(e){console.log(e.target.value),n.setState({value:e.target.value.toUpperCase(),newsearchPerson:e.target.value.toUpperCase()})},n.handleFormPersonByString=function(e){console.log(e.target.value),n.setState({value:e.target.value.toUpperCase(),newsearchPerson:e.target.value.toUpperCase()})},n.state={showAll:!0,persons:[],newPerson:"",newPhonenumber:"",newFormPerson:"",newFormPhonenumber:"",newsearchPerson:"",value:"",deletePersonId:"",error:null,noerror:null,speissi:"\xa0"},console.log("AppPhoneBook constructor"),n.addPerson=n.addPerson.bind(Object(p.a)(Object(p.a)(n))),n.handlePersonChange=n.handlePersonChange.bind(Object(p.a)(Object(p.a)(n))),n.handlesearchPersonChange=n.handlesearchPersonChange.bind(Object(p.a)(Object(p.a)(n))),n.handleFormPersonByString=n.handleFormPersonByString.bind(Object(p.a)(Object(p.a)(n))),n.handleChangeValueFormPerson=n.handleChangeValueFormPerson.bind(Object(p.a)(Object(p.a)(n))),n.handleChangeValueFormPhonenumber=n.handleChangeValueFormPhonenumber.bind(Object(p.a)(Object(p.a)(n))),n.onPersonClickDelDeep=n.onPersonClickDelDeep.bind(Object(p.a)(Object(p.a)(n))),n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log("AppPhoneBook did mount"),S.getAllpromised().then(function(t){e.setState({persons:t,noerror:"personsTAPI getAllpromised gets persons to you!"}),setTimeout(function(){e.setState({noerror:null})},5e3)})}},{key:"refreshPersons",value:function(){var e=this;console.log("AppPhoneBook.js refreshPersons"),this.setState({persons:[]}),S.getAllpromised().then(function(t){e.setState({persons:t})})}},{key:"componentWillUnmount",value:function(){console.log("AppPhoneBook componentWillUnmount")}},{key:"rescueaddPerson",value:function(e){var t=this,n="Rescue added person:"+this.state.speissi+e.name;S.createpromised(e).then(function(e){t.setState({newFormPerson:"",newFormPhonenumber:"",ValueFormPerson:"",ValueFormPhonenumber:"",noerror:n}),console.log("rescueaddPerson succeeded"),setTimeout(function(){t.setState({noerror:null})},5e3),t.refreshPersons()}).catch(function(e){alert("ERROR serveri huone on tulessa korjaa json-server"),t.setState({error:"ERROR serveri huone on tulessa korjaa json-server"}),setTimeout(function(){t.setState({error:null})},5e3)})}},{key:"updatePerson",value:function(e,t){var n=this,o="Updated:"+this.state.speissi+t.name;S.updatepromised(e,t).then(function(e){n.setState({newFormPerson:"",newFormPhonenumber:"",ValueFormPerson:"",ValueFormPhonenumber:"",noerror:o}),console.log("updatePerson done"),setTimeout(function(){n.setState({noerror:null})},5e3),n.refreshPersons()}).catch(function(o){if(alert("ERROR person.id was deleted by THE FASTEST HAND IN THE INTERNET from our json-server"+n.state.speissi+e),n.setState({error:"person.id '".concat(e,"' is no more on json-server"),persons:n.state.persons.filter(function(t){return t.id!==e})}),setTimeout(function(){n.setState({error:null})},5e3),window.confirm("Do you want to fix the json-server by adding Person back"+n.state.speissi+t.name)){var a={name:t.name,phonenumber:t.phonenumber};n.rescueaddPerson(a)}})}},{key:"onPersonClickDelDeep",value:function(){alert("AppPhoneBook onPersonClickDelDeep "),console.log("this.onPersonClickDelDeep")}},{key:"render",value:function(){var e=this;console.log("AppPhoneBook render");var t=this.state.persons;return console.log("AppPhoneBook fetchedpersons",t),a.a.createElement("div",{id:"AppPhoneBook"},a.a.createElement("h4",null,"AppPhoneBook for HW2.14"),a.a.createElement(y,{message:this.state.noerror}),a.a.createElement(k,{message:this.state.error}),a.a.createElement("p",null,"uses axios: adding persons,duplicate prevention,phonenumbers and search"),a.a.createElement("p",null,"components: AllPersons, FilterPersonsByName, FilterPersonsByString, FormPersonAdd"),a.a.createElement("b",null,"Create new phonebook entry or change phonenumber for existing person"),a.a.createElement(B,{ValuePerson:this.state.newFormPerson,onChangeValuePerson:this.handleChangeValueFormPerson,ValuePhonenumber:this.state.newFormPhonenumber,onChangeValuePhonenumber:this.handleChangeValueFormPhonenumber,onSubmit:this.addFormPerson}),a.a.createElement("div",{id:"FilterPersonsByString"},a.a.createElement(A,{searchstring:this.state.newsearchPerson,persons:this.state.persons,onPersonClickDel:function(){return e.refreshPersons()}}),a.a.createElement(w,{value:this.state.value,onChangeValue:this.handleFormPersonByString}),a.a.createElement("form",{onChange:this.searchPerson},a.a.createElement("label",null,"search:",a.a.createElement("input",{name:"searchPersonInput",type:"text",value:this.state.newsearchPerson,onChange:this.handlesearchPersonChange})),"debug: ",this.state.newsearchPerson),a.a.createElement("h3",null,"Person-form in AppPhoneBook"),a.a.createElement("form",{onSubmit:this.addPerson},a.a.createElement("label",null,"name:",a.a.createElement("input",{name:"addPersonInput",type:"text",value:this.state.newPerson,onChange:this.handlePersonChange})),a.a.createElement("p",null,a.a.createElement("label",null,"phonenumber:",a.a.createElement("input",{name:"addPhonenumberInput",type:"text",value:this.state.newPhonenumber,onChange:this.handlePhonenumberChange}))),a.a.createElement("button",{type:"submit"},"tallenna person")),"debug: ",this.state.newPerson))}}]),t}(a.a.Component),D=n(18),N=function(e){var t=e.note,n=e.toggleImportance,o=t.important?"make not important":"make important";return a.a.createElement("li",{className:"note"},">",t.content," ",a.a.createElement("button",{onClick:n},o))},U="https://mysterious-fjord-82967.herokuapp.com/notes",V={getAll:function(){return d.a.get(U)},create:function(e){return d.a.post(U,e)},update:function(e,t){return d.a.put("".concat(U,"/").concat(e),t)},getAllpromised:function(){return d.a.get(U).then(function(e){return e.data})},createpromised:function(e){return d.a.post(U,e).then(function(e){return e.data})},updatepromised:function(e,t){return d.a.put("".concat(U,"/").concat(e),t).then(function(e){return e.data})},getAllpromisedpaskaa:function(){var e=d.a.get(U),t={id:1e4,content:"T\xe4t\xe4 muistiinpanoa ei ole palvelimelta CLICKKAAMUA!!",date:"2017-12-10T17:30:31.098Z",important:!0};return e.then(function(e){return e.data.concat(t)})}},I=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).addNote=function(e){e.preventDefault();var t={content:n.state.newNote,date:(new Date).new,important:Math.random()>.5,id:n.state.notes.length+1};V.createpromised(t).then(function(e){n.setState({notes:n.state.notes.concat(e),newNote:""})})},n.handleNoteChange=function(e){console.log(e.target.value),n.setState({newNote:e.target.value})},n.toggleVisible=function(){n.setState({showAll:!n.state.showAll})},n.toggleImportance=function(e){return function(){console.log("importance of "+e+" needs to be toggled");var t=n.state.notes.find(function(t){return t.id===e}),o=Object(D.a)({},t,{important:!t.important});V.updatepromised(e,o).then(function(t){var o=n.state.notes.filter(function(t){return t.id!==e});n.setState({notes:o.concat(t)})}).catch(function(o){n.setState({error:"muistiinpano '".concat(t.content,"' on jo valitettavasti poistettu palvelimelta"),notes:n.state.notes.filter(function(t){return t.id!==e})}),setTimeout(function(){n.setState({error:null})},5e3)})}},n.state={notes:[],newNote:"",showAll:!0,error:null},console.log("AppNotes constructor"),n.toggleVisible=n.toggleVisible.bind(Object(p.a)(Object(p.a)(n))),n.addNote=n.addNote.bind(Object(p.a)(Object(p.a)(n))),n.handleNoteChange=n.handleNoteChange.bind(Object(p.a)(Object(p.a)(n))),n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log("AppNotes did mount"),V.getAllpromisedpaskaa().then(function(t){e.setState({notes:t})})}},{key:"componentWillUnmount",value:function(){console.log("AppNotes componentWillUnmount")}},{key:"render",value:function(){var e=this;console.log("AppNotes render");var t=this.state.showAll?this.state.notes:this.state.notes.filter(function(e){return!0===e.important}),n=this.state.showAll?"vain t\xe4rke\xe4t":"kaikki";return a.a.createElement(a.a.Fragment,null,a.a.createElement("h1",null,"AppNotes"),"using notesTAPI to get,put,post to json-server",a.a.createElement("button",{onClick:this.toggleVisible},"n\xe4yt\xe4 ",n),a.a.createElement("ul",null,t.map(function(t){return a.a.createElement(N,{key:t.id,note:t,toggleImportance:e.toggleImportance(t.id)})})),a.a.createElement(k,{message:this.state.error}),a.a.createElement("form",{onSubmit:this.addNote},a.a.createElement("input",{name:"addNoteInput",type:"text",value:this.state.newNote,onChange:this.handleNoteChange}),a.a.createElement("button",{type:"submit"},"tallenna")))}}]),t}(a.a.Component),R=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).state={date:new Date},n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"componentDidMount",value:function(){var e=this;console.log("Clock componentDidMount"),this.timerID=setInterval(function(){return e.tick()},1e3)}},{key:"componentWillUnmount",value:function(){console.log("Clock componentWillUnmount"),clearInterval(this.timerID)}},{key:"tick",value:function(){this.setState({date:new Date})}},{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement("h1",null,"Clock"),"It is ",this.state.date.toLocaleTimeString(),".")}}]),t}(a.a.Component),W={c:"Celsius",f:"Fahrenheit"},H=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).handleChange=n.handleChange.bind(Object(p.a)(Object(p.a)(n))),n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"handleChange",value:function(e){this.props.onTemperatureChange(e.target.value)}},{key:"render",value:function(){var e=this.props.temperature,t=this.props.scale;return a.a.createElement("fieldset",null,a.a.createElement("legend",null,"Enter temperature in ",W[t],":"),a.a.createElement("input",{value:e,onChange:this.handleChange}))}}]),t}(a.a.Component);var M=function(e,t){var n=parseFloat(e);if(Number.isNaN(n))return"";var o=t(n);return(Math.round(1e3*o)/1e3).toString()};var x=function(e){return 5*(e-32)/9};var L=function(e){return 9*e/5+32};var K=function(e){return e.celsius>=100?a.a.createElement("p",null,"The water would boil."):a.a.createElement("p",null,"The water would not boil.")},Z=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).handleCelsiusChange=n.handleCelsiusChange.bind(Object(p.a)(Object(p.a)(n))),n.handleFahrenheitChange=n.handleFahrenheitChange.bind(Object(p.a)(Object(p.a)(n))),n.state={temperature:"",scale:"c"},n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"handleCelsiusChange",value:function(e){this.setState({scale:"c",temperature:e})}},{key:"handleFahrenheitChange",value:function(e){this.setState({scale:"f",temperature:e})}},{key:"render",value:function(){var e=this.state.scale,t=this.state.temperature,n="f"===e?M(t,x):t,o="c"===e?M(t,L):t;return a.a.createElement("div",null,a.a.createElement("h3",null,"TemperatureCalculator"),a.a.createElement(H,{scale:"c",temperature:n,onTemperatureChange:this.handleCelsiusChange}),a.a.createElement(H,{scale:"f",temperature:o,onTemperatureChange:this.handleFahrenheitChange}),a.a.createElement(K,{celsius:parseFloat(n)}))}}]),t}(a.a.Component);var J=function(e){var t=e,n=a.a.createElement("div",null,a.a.createElement("h2",null,"Otsikko ",t.kurssi.nimi));return a.a.createElement("div",{id:"otsikko15"},a.a.createElement("hr",null),n)};var G=function(e){var t=e.kurssi.osat.map(function(e){return a.a.createElement("div",{key:e.id},a.a.createElement("p",null,e.id," ",e.nimi," ",e.tehtavia))});return a.a.createElement("div",{id:"osat"},a.a.createElement("hr",null),t)};var Y=function(e){var t=e.kurssi.osat.reduce(function(e,t){return e+t.tehtavia},0),n=e.kurssi.osat.reduce(function(e,t){return e+1},0);return a.a.createElement("div",{id:"summaosa"},a.a.createElement("h3",null,"Yhteens\xe4 teht\xe4vi\xe4 ",t," kappaletta kurssin ",n," osassa"))};var q=function(e){var t=J(e),n=Y(e),o=G(e);return a.a.createElement(a.a.Fragment,null,a.a.createElement("h4",null,"Kurssi.js"),a.a.createElement("div",{id:"otsikko"},a.a.createElement("h5",null,t),a.a.createElement("div",{id:"osat"},o,a.a.createElement("div",{id:"yhteensa"},n))))};var z=function(e){var t=e.kurssit.map(function(e){return a.a.createElement("div",{key:e.id},a.a.createElement(q,{kurssi:e}))});return a.a.createElement("div",null,t)};console.log("App.js - imports loaded");var Q=function(e){function t(e){var n;return Object(l.a)(this,t),(n=Object(u.a)(this,Object(c.a)(t).call(this,e))).state={kurssit:e.kurssit},n}return Object(m.a)(t,e),Object(i.a)(t,[{key:"render",value:function(){return a.a.createElement("div",null,a.a.createElement("div",{id:"opetusohjelma"},a.a.createElement("h1",null,"App hworks for part2 by Paavo")," + some lecture stuff",a.a.createElement("div",{id:"AppPhoneBook"},a.a.createElement("h2",null,"AppPhoneBook HW2.6-HW2.11, HW2.14-HW2.19"),a.a.createElement(T,null)),a.a.createElement("div",{id:"AppCountries"},a.a.createElement("h2",null,"AppCountries HW2.11-HW2.13"),a.a.createElement(j,null)),a.a.createElement("div",{id:"Kurssit"},a.a.createElement("h2",null,"Kurssit HW2.1-HW2.5"),a.a.createElement(z,{kurssit:this.state.kurssit})),a.a.createElement("div",{id:"AppNotes"},a.a.createElement(I,null)),a.a.createElement("div",{id:"Clock"},a.a.createElement("h2",null,"Clock"),a.a.createElement(R,null)),a.a.createElement("div",{id:"TemperatureCalculator"},a.a.createElement("h2",null,"TemperatureCalculator"),a.a.createElement(Z,null))))}}]),t}(a.a.Component),X=[{id:1,content:"HTML on helppoa",date:"2017-12-10T17:30:31.098Z",important:!0},{id:2,content:"Selain pystyy suorittamaan vain javascripti\xe4",date:"2017-12-10T18:39:34.091Z",important:!1},{id:3,content:"HTTP-protokollan t\xe4rkeimm\xe4t metodit ovat GET ja POST",date:"2017-12-10T19:20:14.298Z",important:!0}];console.log("halfstackkurssi.js loading");var $={nimi:"Half Stack -sovelluskehitys",id:1,osat:[{nimi:"Reactin perusteet",tehtavia:10,id:1},{nimi:"Tiedonv\xe4litys propseilla",tehtavia:7,id:2},{nimi:"Komponenttien tila",tehtavia:14,id:3}]};console.log("nodekurssi.js loading");var _=[$,{nimi:"Node.js",id:2,osat:[{nimi:"Routing",tehtavia:3,id:1},{nimi:"Middlewaret",tehtavia:7,id:2}]}],ee=[{id:1,name:"Arto Hellas",phonenumber:"+358 1234 567"},{id:2,name:"Martti Tienari",phonenumber:"040-123456"},{id:3,name:"Arto J\xe4rvinen",phonenumber:"040-123456"},{id:4,name:"Lea Kutvonen",phonenumber:"040-123456"}];console.log(ee),console.log(ee[1].name);var te=ee.filter(function(e){return"Arto Hellas"===e.name});console.log(te);var ne=ee.filter(function(e){return"ARTO HELLAS"===e.name.toUpperCase()});console.log("searchitpersons",ne);var oe=ee.filter(function(e){return e.name.toUpperCase().includes("ARTO HELLAS")});console.log("searchitpersons2",oe);var ae=ee.filter(function(e){return e.name.toUpperCase().includes("AR")});console.log("searchitpersons3",ae);var re=ee;console.log("Index.js loading"),s.a.render(a.a.createElement(Q,{notes:X,kurssit:_,persons:re}),document.getElementById("root"))}},[[19,2,1]]]);
//# sourceMappingURL=main.5b7dd36c.chunk.js.map