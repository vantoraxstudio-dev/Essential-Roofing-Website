// Mobile menu
const btn=document.querySelector(".menu-btn"),nav=document.getElementById("nav");
btn.addEventListener("click",()=>{const o=nav.classList.toggle("open");btn.setAttribute("aria-expanded",o)});
document.addEventListener("keydown",e=>{if(e.key==="Escape"&&nav.classList.contains("open")){nav.classList.remove("open");btn.setAttribute("aria-expanded","false");btn.focus()}});
// FAQ accordion (buttons are natively keyboard accessible)
document.querySelectorAll(".faq button").forEach(b=>b.addEventListener("click",()=>{
  const open=b.getAttribute("aria-expanded")==="true";
  b.setAttribute("aria-expanded",!open);document.getElementById(b.getAttribute("aria-controls")).hidden=open}));
// Contact form
// CONFIG: set to your form provider URL (e.g. Formspree) to send real requests. Empty = demo mode, nothing is sent.
const FORM_ENDPOINT="";
const form=document.getElementById("est");
if(form){
  const msgs={name:"Enter your name.",email:"Enter a valid email address.",service:"Choose the service you need.",msg:"Briefly describe your project."};
  form.addEventListener("submit",async e=>{
    e.preventDefault();let first=null;
    Object.keys(msgs).forEach(k=>{const f=form.elements[k],err=document.getElementById(k+"-e"),bad=!f.value.trim()||(k==="email"&&!f.checkValidity());
      f.setAttribute("aria-invalid",bad);f.setAttribute("aria-describedby",k+"-e");err.textContent=bad?msgs[k]:"";if(bad&&!first)first=f});
    const st=document.getElementById("status");
    if(first){first.focus();st.textContent="Please fix the highlighted fields.";return}
    if(!FORM_ENDPOINT){st.textContent="Demo only: your details look valid, but no form provider is connected, so nothing was sent.";st.focus();return}
    try{const r=await fetch(FORM_ENDPOINT,{method:"POST",headers:{Accept:"application/json"},body:new FormData(form)});
      st.textContent=r.ok?"Thanks, your request was sent.":"Sending failed. Please call or email instead.";if(r.ok)form.reset()}
    catch{st.textContent="Sending failed. Please call or email instead."}
    st.focus()});
}
