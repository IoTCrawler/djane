/*******************************************************************************
 * Copyright (c) 2019 sensinov (www.sensinov.com)
 * 41 Rue de la découverte, 31676 Labège, France
 *
 * All rights reserved. This program and the accompanying materials
 * are made available under the terms of the Eclipse Public License v1.0
 * which accompanies this distribution, and is available at
 * http://www.eclipse.org/legal/epl-v10.html
 *
 * Contributors:
 *     Mahdi Ben Alaya (Project co-founder) - Management and initial specification,
 *         design, implementation, test and documentation.
 *     Ghada Gharbi (Project co-founder) - Management and initial specification,
 *         design, implementation, test and documentation.
 * Authors: 
 * 		Ghada Gharbi < ghada.gharbi@sensinov.com >
 ******************************************************************************/
const serverPort = +process.env.SERVER_PORT || 3000;

//MongoDB config
const dbName =  'ngsi_ld_bd'; 
const mongoDBHost = process.env.DB_CONNECTION_URI || 'mongodb://127.0.0.1:27017';

const apiName = '/ngsi-ld'; 
const apiversion = 'v1'; 
const basePath = apiName + '/' + apiversion; 
const username = "admin"; 
const password = "admin4djane";
let authentication=true;
if(process.env.AUTH === "false"){
    authentication=false;
}

module.exports = {
    serverPort,
    mongoDBHost,
    dbName, 
    basePath, 
    username, 
    password, 
    authentication
}