//function to build tabs for the defined codes using <isTab = 'true'> as an attribute
//This method will build tabs inside the wrapper defined by the user using <class="cspshBuildTabs"> 
function BuildTabs() {
    //Get all the tabWrapper elements
    const wrappers = document.getElementsByClassName('cspshBuildTabs');
    for (var i = 0; i < wrappers.length; i++) {
        //creating a tab button holder to append all the buttons that indicate the respective tab
        const tabChangersWrapper = document.createElement('div');
        const wrapper = wrappers[i];
        const codes = wrapper.getElementsByClassName('CSPSH');
        for (var j = 0; j < codes.length; j++) {
            const code = codes[j];
            const tabName = code.getAttribute('name') + '.' + code.lang;
            const changeTab = document.createElement('div');
            changeTab.classList.add('cspshChangeTab');
            //setting tab name to the file name provided by the user
            changeTab.innerHTML = tabName;
            //appending the tab to the div element(tab buttons holder)
            tabChangersWrapper.appendChild(changeTab)
        }
        tabChangersWrapper.className = 'tabChangersWrapper';
        //appending the tab buttons holder to the wrapper
        wrapper.appendChild(tabChangersWrapper)
    }

    //get all the tab changers(buttons) to add event listeners
    const tabChangers = document.getElementsByClassName('cspshChangeTab');
    const tabWrappers = [...document.getElementsByClassName('tabChangersWrapper')];
    tabWrappers.forEach(tabWrapper => {
        //set the z-index of first code to max so it can be viewed first and change the styling of respective button to indicate the selected tab.
        tabWrapper.parentElement.children[0].style.zIndex = 10
        tabWrapper.firstChild.classList.add('activeTab')
    })

    //add event listeners to the tab changers
    for (var l = 0; l < tabChangers.length; l++) {
        const changeTab = tabChangers[l];
        changeTab.addEventListener('click', function (clicked) {
            const codes = [...clicked.composedPath()[2].getElementsByClassName('cspsh')];
            const clickedButton = clicked.composedPath()[0];
            const parentOfClicked = clickedButton.parentElement;
            [...parentOfClicked.children].forEach(button => {
                //toggle the style to indicate the selected tab(currently viewing tab).
                if (button != clickedButton) {
                    button.classList.add('inactiveTab')
                    button.classList.remove('activeTab')
                } else {
                    button.classList.add('activeTab')
                    button.classList.remove('inactiveTab')
                }
            })
            //set the z-index of the selected tab to max so it can be viewed.
            for (var k = 0; k < codes.length; k++) {
                const codeInside = codes[k];
                if (codeInside.getAttribute('name') + '.' + codeInside.lang == this.innerHTML) {
                    codeInside.style.zIndex = '10';
                } else {
                    codeInside.style.zIndex = '0';
                }
            }
        })
    }
}

export { BuildTabs };