function SystemHotWaterHeatingEnergyProduction (system,constants) {
	var hour;
	var index;
	var systemProfile = new Profile();
	var individualProfile = new Profile();
	for(hour=0;hour<8760;hour++) {
		systemProfile.profile[hour] = 0.0;
	}
	for(index=0;index<system.solarInstallation.length;index++) {
		individualProfile = SolarHeatingEnergyProductionProfile(system.solarInstallation[index],constants);
		for(hour=0;hour<8760;hour++) {
			if( !(isNaN(individualProfile.profile[hour])) ) {
				systemProfile.profile[hour] += individualProfile.profile[hour];
			}
		}
	}
	for(index=0;index<system.borehole.length;index++) {
		individualProfile = BoreholeHotWaterHeatingEnergyProductionProfile(system,system.borehole[index],constants);
		for(hour=0;hour<8760;hour++) {
			if( !(isNaN(individualProfile.profile[hour])) ) {
				systemProfile.profile[hour] += individualProfile.profile[hour];
			}
		}
	}
	return systemProfile;
}