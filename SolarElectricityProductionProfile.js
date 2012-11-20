function SolarElectricityProductionProfile( solarInstallation, constants ) {
	
	var profile = new Profile();
	var hour;


	solarPanel.area
	solarPanel.electricityPeakPowerFactor
	solarPanel.electricityInstallationFactor

	radiation ?

	constants

	Aurinkosähkö
{
	Paneelin pinta-ala m2
	Huipputehokerroin = 0.15
	Säteilymäärä kWh/m2
	Pmax = Huipputehokerroin * pinta-ala
	Käyttötilannekerroin 0.75 ( hieman tuulettuva )

	Tuotto = säteilymäärä * ( pinta-ala * Huipputehokerroin )* Käyttötilasnnekerroin / 1 (yksiköiden takia 

	Jos tuotto suurempi kuin kulutus, niin ylimäärä menee hukkaan tai myyntiin.


	 säteilymäärä = f( A , sätelyjakauma )
}

	InstallationAreaAvgIrradiance(SolarInstallation,constants) * solarInstallation.photovoltaicArea * solarInstallation.photovoltaicPeakPowerFactor * solarIstallation.photovoltaicInstallationFactor;

	totalElectricityProduction = solarPanel.photovoltaicArea * 

		for(hour=0;hour<8760;hour++) {
			profile.profile[hour] = 
		}

	return profile;
}

function InstallationAreaAvgIrradiance( solarInstallation, constants ) {

	var installationAreaOnGoodRoofArea;
	var installationAreaOnRemainingRoofArea;
	var roofRemainingAreaAvgIrradiance;
	var installationAreaTotalIrradiance;
	var installationTotalArea = solarInstallation.photovoltaicArea + solarInstallation.thermalArea;


	if( installationTotalArea <= solarInstallation.roofGoodArea ) {
		installationAreaOnGoodRoofArea = installationTotalArea
		installationAreaOnRemainingRoofArea = 0;
	} else {
		installationAreaOnGoodRoofArea = solarInstallation.roofGoodArea;
		installationAreaOnRemainingRoofArea = installationTotalArea - installationAreaOnGoodRoofArea;
	}

	roofRemainingAreaAvgIrradiance = ( solarInstallation.roofAreaTotalIrradiance - solarInstallation.roofGoodAreaTotalIrradiance ) / ( solarInstallation.roofArea - solarInstallation.roofGoodArea );

	installationAreaTotalIrradiance = installationAreaOnGoodRoofArea * solarInstallation.roofGoodAreaAvgRadiation;
	installationAreaTotalIrradiance += installationAreaOnRemainingRoofArea * roofRemainingAreaAvgIrradiance;

	return installationAreaTotalIrradiance / installationTotalArea;
}