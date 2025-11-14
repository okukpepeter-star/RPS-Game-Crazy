function attemptPurchase(item){
  const cost = getItemCost(item);
  if(state.hackUnlocked || state.freeShop){
    applyItem(item); 
    sfxBuy.play(); 
    renderShop(); 
    checkHackUnlock(item);
    return;
  }
  if(state.points >= cost){ 
    state.points -= cost; 
    applyItem(item); 
    sfxBuy.play(); 
    renderState(); 
    renderShop(); 
    checkHackUnlock(item);
  }
  else { alert('Not enough points: need '+cost+' pts'); }
}

// Check if hack menu purchased to auto-scroll and unlock
function checkHackUnlock(item){
  if(item.id === 'hackMenuUnlock'){
    unlockHackMenu(); // show hack panel
    // scroll shop to hack menu
    const el = document.getElementById('shop-'+item.id);
    if(el) el.scrollIntoView({behavior:'smooth', block:'center'});
  }
}
givePointsBtn.addEventListener('click', ()=>{ 
  if(!state.hackUnlocked){ alert('Unlock hack menu first!'); return;} 
  state.points += 1000000; 
  showAchievement('+1,000,000 pts Granted'); 
  renderState(); 
});