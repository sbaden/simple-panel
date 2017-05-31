
function onLoaded() {
    var csInterface = new CSInterface();   
    var appName = csInterface.hostEnvironment.appName;
    
    if(appName != "FLPR"){
    	loadJSX();
    }    
}

$(document).ready(function(){

    // SAMPLE OBJECT
    var profileUI = {
        script: '',
        data: {
            csv:    $('#csv')[0].checked,           // PRODUCER GENERATED
            feed:   $('#json')[0].checked,          // NFL FEEDS
            gs:     $('#googleSheets')[0].checked   // GOOGLE SHEETS
        },
    }

    $('#btn_batch').on('click', function(){
        // CONVERTS OBJECT INTO A STRING TO PASS TO JSX
        var objString = JSON.stringify(profileUI).replace(/"/g,'\\"');  // .replace(/"/g,'\\"') ignores all internal quotes from stringify so it can be passed as a valid string

        var csInterface = new CSInterface();
        csInterface.evalScript('$._ext_SB.batch("' + objString + '")' );
    });


    ///////////////// TEMP BUTTON FOR DEV: RELOADS EXTENTION PANEL
    $("#btn_reload").click(reloadPanel);

    function reloadPanel() {
        location.reload();
    }
    /////////////////
    
});

    

// Load JSX file into the scripting context of the product. 
function loadJSX() {
    var csInterface = new CSInterface();
    var extensionRoot = csInterface.getSystemPath(SystemPath.EXTENSION) + "/jsx/";  // All JSX files in folder [ExtensionRoot]/jsx will be loaded.
    csInterface.evalScript('$._ext.evalFiles("' + extensionRoot + '")');
}








