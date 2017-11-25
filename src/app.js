var app = angular.module("barcode",[]);
app.controller("barcodeCtrl",function($scope){
 	$scope.scans = [];
	var scanner = new Instascan.Scanner({ video: document.getElementById('preview'),scanPeriod: 5 });

	scanner.addListener('scan', function (content, image) {

      $scope.scans.unshift({ date: +(Date.now()), content: content });
      $scope.$apply();
    });
	Instascan.Camera.getCameras().then(function (cameras) {
		if (cameras.length > 0) {
		var selectedCam = scanner.start(cameras[0]);
		 $.each(cameras, (i, c) => {
         if (c.name.indexOf('back') != -1) {
            	selectedCam = c;
            return false;
        	}
        
    	});
		scanner.start(selectedCam);  
		} else {
		  console.error('No cameras found.');
		}
		}).catch(function (e) {
		console.error(e);
});	
 });
