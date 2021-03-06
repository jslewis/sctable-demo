/*globals SCTableDemo SCTable*/

/*
  (Source data below is randomly generated.  None of it is real.)
*/

SCTableDemo.sampleDataColumns = [
  SC.Object.create(SCTable.Column, {
    name: "Index",
    valueKey: 'index',
    width: 50
  }),
  SC.Object.create(SCTable.Column, {
    name: "Name",
    valueKey: 'name',
    width: 150
  }),
  SC.Object.create(SCTable.Column, {
    name: "Country",
    valueKey: 'country',
    iconKey: 'countryIcon',
    width: 150
  }),
  SC.Object.create(SCTable.Column, {
    name: "Phone",
    valueKey: 'phone',
    width: 150
  }),
  SC.Object.create(SCTable.Column, {
    name: "Some Stars!",
    valueKey: 'stars',
    width: 100,
    canResize: NO
  }),
  SC.Object.create(SCTable.Column, {
    name: "Date",
    valueKey: 'date',
    width: 150
  }),
  SC.Object.create(SCTable.Column, {
    name: "Lorem Ipsum",
    valueKey: 'filler',
    width: 250
  })
];

SCTableDemo.sampleRows = [];

SCTableDemo.sampleData = [
{"index":1,"name":"Lucy Bush","country":"Iran, Islamic Republic of","phone":"1-397-773-1621","date":"Oct 14, 2011","filler":"Fusce"},
{"index":2,"name":"Felicia Ortiz","country":"Netherlands Antilles","phone":"1-297-498-1204","date":"Aug 1, 2010","filler":"lorem, eget mollis lectus pede et risus. Quisque"},
{"index":3,"name":"Samuel Hampton","country":"American Samoa","phone":"1-369-937-3535","date":"Apr 21, 2011","filler":"orci sem eget massa. Suspendisse eleifend. Cras"},
{"index":4,"name":"Lila Vincent","country":"Bhutan","phone":"1-300-949-8628","date":"Dec 4, 2011","filler":"risus."},
{"index":5,"name":"Orlando Vaughn","country":"Indonesia","phone":"1-710-714-4497","date":"May 25, 2010","filler":"cursus vestibulum. Mauris magna. Duis dignissim tempor arcu. Vestibulum ut"},
{"index":6,"name":"Claire Mcintosh","country":"Liberia","phone":"1-385-470-3676","date":"May 14, 2010","filler":"ac mi eleifend egestas. Sed"},
{"index":7,"name":"Mallory Copeland","country":"Saint Helena","phone":"1-199-260-5045","date":"Sep 3, 2010","filler":"sagittis lobortis mauris. Suspendisse aliquet molestie tellus. Aenean egestas"},
{"index":8,"name":"Ava Boone","country":"Barbados","phone":"1-639-276-1039","date":"Apr 19, 2011","filler":"sem mollis dui, in sodales elit erat"},
{"index":9,"name":"Oscar Gay","country":"Zimbabwe","phone":"1-539-446-4079","date":"Oct 29, 2011","filler":"Praesent interdum ligula eu enim. Etiam"},
{"index":10,"name":"Hillary Myers","country":"Palau","phone":"1-520-438-0594","date":"Dec 19, 2010","filler":"ante bibendum ullamcorper. Duis cursus,"},
{"index":11,"name":"Ciaran Conway","country":"United States Minor Outlying Islands","phone":"1-263-208-7584","date":"Oct 23, 2010","filler":"convallis est, vitae sodales nisi"},
{"index":12,"name":"Ann Sherman","country":"Bouvet Island","phone":"1-733-877-6725","date":"Sep 30, 2010","filler":"Curae; Donec tincidunt."},
{"index":13,"name":"Caesar Hays","country":"Ukraine","phone":"1-166-476-2511","date":"May 7, 2010","filler":"malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris"},
{"index":14,"name":"Leslie Baker","country":"Kuwait","phone":"1-777-155-7130","date":"Jul 8, 2010","filler":"Fusce mi lorem, vehicula et, rutrum eu,"},
{"index":15,"name":"Rhona Shepherd","country":"Tunisia","phone":"1-795-432-0572","date":"May 24, 2011","filler":"in faucibus orci luctus et ultrices posuere cubilia"},
{"index":16,"name":"Shaine Frank","country":"Saint Vincent and The Grenadines","phone":"1-305-200-6829","date":"Nov 12, 2011","filler":"vulputate, lacus. Cras interdum. Nunc sollicitudin commodo ipsum. Suspendisse non"},
{"index":17,"name":"Imelda Reynolds","country":"Senegal","phone":"1-447-880-0868","date":"Jun 1, 2010","filler":"quam"},
{"index":18,"name":"Leah Vang","country":"Oman","phone":"1-426-837-9961","date":"Oct 18, 2011","filler":"mauris id sapien. Cras dolor dolor, tempus non, lacinia"},
{"index":19,"name":"Brittany Garrett","country":"Hong Kong","phone":"1-968-657-6553","date":"Jul 19, 2010","filler":"mus. Aenean eget magna. Suspendisse"},
{"index":20,"name":"Mohammad Baird","country":"Mexico","phone":"1-438-121-8114","date":"Jul 1, 2010","filler":"vehicula risus. Nulla eget"},
{"index":21,"name":"Brielle Kelley","country":"Guatemala","phone":"1-540-405-1717","date":"Dec 29, 2010","filler":"porttitor"},
{"index":22,"name":"Griffith Parker","country":"Myanmar","phone":"1-909-702-9830","date":"Oct 29, 2010","filler":"lacinia. Sed congue, elit"},
{"index":23,"name":"Armand Koch","country":"Djibouti","phone":"1-406-546-9531","date":"Apr 11, 2010","filler":"malesuada fringilla est. Mauris"},
{"index":24,"name":"Mikayla Nielsen","country":"Benin","phone":"1-361-332-4218","date":"Jan 11, 2011","filler":"nec luctus felis"},
{"index":25,"name":"Leilani Gonzales","country":"Albania","phone":"1-870-524-1204","date":"Jun 18, 2011","filler":"ligula. Aliquam erat volutpat."},
{"index":26,"name":"Tanisha Williamson","country":"Armenia","phone":"1-926-249-3924","date":"Oct 23, 2010","filler":"Sed eu nibh vulputate mauris sagittis placerat. Cras"},
{"index":27,"name":"Whitney Hancock","country":"Timor-leste","phone":"1-926-168-4805","date":"Sep 17, 2011","filler":"porttitor scelerisque neque. Nullam"},
{"index":28,"name":"Warren Conrad","country":"Guatemala","phone":"1-916-631-6608","date":"Nov 25, 2011","filler":"in, cursus"},
{"index":29,"name":"Iliana Bennett","country":"Dominican Republic","phone":"1-304-901-8599","date":"May 25, 2011","filler":"Phasellus"},
{"index":30,"name":"Fitzgerald Barry","country":"Israel","phone":"1-706-369-4354","date":"Sep 24, 2010","filler":"natoque penatibus et"},
{"index":31,"name":"Geraldine Morgan","country":"Rwanda","phone":"1-697-197-1731","date":"Sep 28, 2011","filler":"faucibus lectus, a sollicitudin orci sem eget"},
{"index":32,"name":"Galena Atkins","country":"Kazakhstan","phone":"1-774-401-2448","date":"Apr 14, 2011","filler":"quis urna. Nunc quis arcu vel quam dignissim pharetra. Nam"},
{"index":33,"name":"Kenyon Dyer","country":"Guam","phone":"1-383-192-8091","date":"Jul 28, 2010","filler":"magna a"},
{"index":34,"name":"Kim Lawson","country":"Pitcairn","phone":"1-124-564-6981","date":"May 18, 2011","filler":"ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla"},
{"index":35,"name":"Stewart Gregory","country":"Andorra","phone":"1-368-567-7587","date":"Dec 19, 2011","filler":"accumsan sed, facilisis vitae, orci. Phasellus dapibus"},
{"index":36,"name":"Indigo Copeland","country":"Moldova","phone":"1-228-565-9348","date":"Sep 22, 2010","filler":"Donec sollicitudin adipiscing ligula. Aenean gravida"},
{"index":37,"name":"Lee Harrell","country":"Panama","phone":"1-663-510-2951","date":"Feb 19, 2011","filler":"vulputate eu, odio. Phasellus at augue id"},
{"index":38,"name":"Chelsea Briggs","country":"Guyana","phone":"1-725-672-1766","date":"Mar 22, 2011","filler":"nec, cursus a, enim. Suspendisse aliquet,"},
{"index":39,"name":"Zenia Clayton","country":"Malaysia","phone":"1-771-123-0525","date":"Mar 16, 2010","filler":"id enim. Curabitur massa. Vestibulum accumsan neque"},
{"index":40,"name":"Neville Snow","country":"American Samoa","phone":"1-162-620-9485","date":"Feb 6, 2012","filler":"a sollicitudin"},
{"index":41,"name":"Nell Bryan","country":"Monaco","phone":"1-373-476-7719","date":"May 24, 2011","filler":"eleifend egestas. Sed pharetra,"},
{"index":42,"name":"Silas Bailey","country":"Palestinian Territory, Occupied","phone":"1-813-275-1609","date":"Sep 18, 2010","filler":"semper. Nam tempor"},
{"index":43,"name":"Hayley Washington","country":"Djibouti","phone":"1-910-458-9261","date":"Feb 20, 2011","filler":"felis, adipiscing fringilla,"},
{"index":44,"name":"Wang Blevins","country":"Venezuela","phone":"1-690-908-5255","date":"Jan 25, 2012","filler":"aliquet odio. Etiam"},
{"index":45,"name":"Maryam Meyer","country":"Qatar","phone":"1-958-994-7973","date":"Jun 4, 2011","filler":"ullamcorper"},
{"index":46,"name":"Dorian Winters","country":"Antarctica","phone":"1-369-350-1036","date":"Jul 31, 2011","filler":"iaculis nec, eleifend non, dapibus rutrum,"},
{"index":47,"name":"Iris Curtis","country":"Cayman Islands","phone":"1-217-107-5762","date":"Oct 31, 2011","filler":"lacinia"},
{"index":48,"name":"Clio Gutierrez","country":"Nepal","phone":"1-362-397-2086","date":"May 7, 2010","filler":"dapibus ligula. Aliquam erat volutpat. Nulla dignissim. Maecenas"},
{"index":49,"name":"Cairo Castillo","country":"Morocco","phone":"1-337-137-7843","date":"Mar 2, 2012","filler":"et, magna."},
{"index":50,"name":"Aladdin Gregory","country":"Vanuatu","phone":"1-665-884-6154","date":"Jul 24, 2010","filler":"velit. Cras lorem lorem, luctus ut, pellentesque eget,"},
{"index":51,"name":"Ronan Stevenson","country":"Iceland","phone":"1-417-221-8003","date":"Jan 26, 2012","filler":"enim. Mauris quis turpis vitae"},
{"index":52,"name":"Ulysses Hooper","country":"Macedonia","phone":"1-801-499-9504","date":"Mar 15, 2010","filler":"mauris a nunc. In at pede. Cras vulputate velit eu"},
{"index":53,"name":"Nelle Salinas","country":"Paraguay","phone":"1-128-831-9119","date":"Mar 23, 2010","filler":"Ut tincidunt orci quis lectus. Nullam"},
{"index":54,"name":"Ayanna Higgins","country":"Antigua and Barbuda","phone":"1-621-770-6667","date":"Mar 11, 2011","filler":"justo sit"},
{"index":55,"name":"Leroy Sanchez","country":"Indonesia","phone":"1-396-279-2614","date":"Oct 20, 2011","filler":"vel, faucibus id, libero. Donec consectetuer mauris"},
{"index":56,"name":"Aspen Orr","country":"Australia","phone":"1-123-200-2778","date":"Apr 17, 2011","filler":"cursus et, eros. Proin ultrices."},
{"index":57,"name":"Jessamine Blake","country":"Palestinian Territory, Occupied","phone":"1-935-553-4806","date":"Aug 21, 2011","filler":"cursus, diam at"},
{"index":58,"name":"Darrel Gross","country":"French Polynesia","phone":"1-345-666-7934","date":"Oct 12, 2011","filler":"nunc. In at pede. Cras vulputate velit eu sem."},
{"index":59,"name":"Gregory Fry","country":"Tokelau","phone":"1-122-677-9259","date":"Mar 29, 2010","filler":"mi tempor lorem, eget mollis lectus pede et risus."},
{"index":60,"name":"Linda Bolton","country":"Egypt","phone":"1-937-504-1734","date":"Jan 19, 2012","filler":"lacus. Mauris non"},
{"index":61,"name":"Dorothy Molina","country":"Malaysia","phone":"1-267-434-1277","date":"Feb 23, 2012","filler":"iaculis nec, eleifend"},
{"index":62,"name":"Minerva Stevenson","country":"Netherlands","phone":"1-970-620-0474","date":"Jan 3, 2012","filler":"senectus et netus et malesuada fames ac turpis egestas."},
{"index":63,"name":"Mufutau Carson","country":"Peru","phone":"1-233-976-4991","date":"Dec 10, 2010","filler":"nisl sem, consequat nec, mollis vitae, posuere at,"},
{"index":64,"name":"Naomi Hartman","country":"Botswana","phone":"1-338-391-3061","date":"Dec 19, 2011","filler":"Ut sagittis lobortis mauris. Suspendisse aliquet"},
{"index":65,"name":"Clare Davenport","country":"New Caledonia","phone":"1-949-346-9869","date":"Jan 3, 2012","filler":"sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam rutrum lorem"},
{"index":66,"name":"Carol Oliver","country":"Saint Helena","phone":"1-390-230-3619","date":"Apr 9, 2010","filler":"fringilla ornare placerat, orci lacus vestibulum lorem, sit"},
{"index":67,"name":"Jaime Wooten","country":"Tokelau","phone":"1-183-117-7153","date":"Jun 30, 2010","filler":"non"},
{"index":68,"name":"Nichole Contreras","country":"Egypt","phone":"1-542-565-5027","date":"Sep 9, 2010","filler":"laoreet"},
{"index":69,"name":"Hadley Hutchinson","country":"Wallis and Futuna","phone":"1-358-650-3319","date":"Nov 3, 2011","filler":"congue a, aliquet vel, vulputate eu, odio."},
{"index":70,"name":"Jin Hammond","country":"Guinea","phone":"1-788-935-5957","date":"Mar 7, 2010","filler":"nulla ante, iaculis nec, eleifend non, dapibus"},
{"index":71,"name":"Philip Young","country":"Albania","phone":"1-725-681-6147","date":"Nov 18, 2011","filler":"est"},
{"index":72,"name":"Vladimir Mccarty","country":"Macedonia","phone":"1-333-236-6861","date":"Apr 22, 2010","filler":"eu dolor egestas rhoncus. Proin nisl sem,"},
{"index":73,"name":"Paki Hancock","country":"Denmark","phone":"1-714-373-4359","date":"May 29, 2011","filler":"non, lacinia"},
{"index":74,"name":"Amery Best","country":"Croatia","phone":"1-635-958-6172","date":"Jun 26, 2010","filler":"lobortis quam a felis"},
{"index":75,"name":"Jaime Calhoun","country":"Rwanda","phone":"1-788-215-5690","date":"Dec 29, 2010","filler":"quam quis diam. Pellentesque habitant morbi"},
{"index":76,"name":"Octavius Maxwell","country":"British Indian Ocean Territory","phone":"1-915-500-3620","date":"Mar 29, 2010","filler":"dolor, tempus non, lacinia at, iaculis quis, pede. Praesent"},
{"index":77,"name":"Imelda Garrett","country":"Sao Tome and Principe","phone":"1-206-128-6745","date":"Aug 3, 2010","filler":"hendrerit a, arcu. Sed et libero. Proin mi. Aliquam"},
{"index":78,"name":"Levi Manning","country":"Mali","phone":"1-756-397-2335","date":"Dec 2, 2011","filler":"placerat, augue. Sed molestie."},
{"index":79,"name":"Carol Schmidt","country":"Monaco","phone":"1-996-608-4658","date":"Jun 25, 2011","filler":"massa. Suspendisse"},
{"index":80,"name":"Ross Ramos","country":"Virgin Islands, British","phone":"1-444-174-7971","date":"Apr 14, 2011","filler":"a, aliquet vel, vulputate eu, odio."},
{"index":81,"name":"Heidi Obrien","country":"Zambia","phone":"1-969-610-3669","date":"Dec 6, 2011","filler":"aliquet. Phasellus fermentum convallis ligula."},
{"index":82,"name":"Hammett England","country":"Macedonia","phone":"1-469-866-2460","date":"Nov 22, 2010","filler":"risus. In mi pede, nonummy ut,"},
{"index":83,"name":"Cora Whitehead","country":"Timor-leste","phone":"1-294-256-2928","date":"Apr 20, 2011","filler":"sed consequat auctor, nunc nulla vulputate dui, nec tempus"},
{"index":84,"name":"Lester Elliott","country":"Andorra","phone":"1-266-143-8774","date":"Aug 31, 2010","filler":"auctor ullamcorper, nisl arcu iaculis enim, sit amet"},
{"index":85,"name":"Nathaniel Winters","country":"Egypt","phone":"1-611-137-7660","date":"Oct 1, 2011","filler":"Quisque fringilla euismod enim. Etiam"},
{"index":86,"name":"Ross Armstrong","country":"Seychelles","phone":"1-814-528-7055","date":"Oct 29, 2010","filler":"massa. Quisque porttitor eros nec tellus."},
{"index":87,"name":"Rina Daniel","country":"Falkland Islands (Malvinas)","phone":"1-174-388-9646","date":"Jun 3, 2010","filler":"vulputate, nisi sem semper erat, in consectetuer"},
{"index":88,"name":"Caleb Lamb","country":"Uganda","phone":"1-930-482-1637","date":"Jan 17, 2012","filler":"et malesuada"},
{"index":89,"name":"Aline Waller","country":"Bahrain","phone":"1-398-827-6231","date":"Nov 30, 2011","filler":"et malesuada fames ac turpis egestas. Fusce aliquet magna"},
{"index":90,"name":"Anne Adams","country":"Moldova","phone":"1-999-127-3436","date":"Dec 30, 2011","filler":"enim, gravida sit"},
{"index":91,"name":"Joseph Deleon","country":"Jordan","phone":"1-654-437-1095","date":"Feb 7, 2012","filler":"in sodales"},
{"index":92,"name":"Linda Davenport","country":"Sierra Leone","phone":"1-227-220-8542","date":"Mar 9, 2010","filler":"est. Nunc ullamcorper,"},
{"index":93,"name":"Quemby Parks","country":"Ukraine","phone":"1-224-678-3882","date":"May 21, 2010","filler":"aliquam adipiscing lacus. Ut nec"},
{"index":94,"name":"Azalia Albert","country":"Czech Republic","phone":"1-814-636-6121","date":"Dec 9, 2010","filler":"adipiscing non, luctus sit amet,"},
{"index":95,"name":"September Conrad","country":"Cambodia","phone":"1-744-301-0499","date":"Oct 7, 2011","filler":"Proin velit. Sed malesuada augue ut lacus. Nulla"},
{"index":96,"name":"Vance Ross","country":"Iceland","phone":"1-265-638-2905","date":"Nov 15, 2010","filler":"rutrum"},
{"index":97,"name":"Willa Wade","country":"Philippines","phone":"1-171-591-6056","date":"May 20, 2011","filler":"sit amet ornare lectus justo eu arcu. Morbi sit amet"},
{"index":98,"name":"Allen Sykes","country":"Benin","phone":"1-407-160-9900","date":"Mar 6, 2011","filler":"pellentesque. Sed dictum. Proin eget"},
{"index":99,"name":"Kameko Hammond","country":"Argentina","phone":"1-247-307-4670","date":"Oct 13, 2010","filler":"Ut semper pretium"},
{"index":100,"name":"Gwendolyn Gardner","country":"Mozambique","phone":"1-576-382-3723","date":"Jan 23, 2011","filler":"vel, faucibus id, libero. Donec consectetuer mauris id"},
{"index":101,"name":"Iris Dudley","country":"Algeria","phone":"1-544-375-9216","date":"Mar 20, 2011","filler":"sit amet, faucibus ut,"},
{"index":102,"name":"Hayley Pearson","country":"Sao Tome and Principe","phone":"1-915-643-9701","date":"Jul 29, 2010","filler":"pharetra,"},
{"index":103,"name":"Quinlan Kemp","country":"Barbados","phone":"1-895-323-7159","date":"Dec 27, 2010","filler":"vulputate, posuere vulputate, lacus. Cras interdum. Nunc sollicitudin commodo"},
{"index":104,"name":"Hanae Cruz","country":"Norfolk Island","phone":"1-228-782-0791","date":"Jun 10, 2010","filler":"massa rutrum magna. Cras convallis convallis dolor. Quisque tincidunt pede"},
{"index":105,"name":"Walter Norris","country":"Macao","phone":"1-144-676-8584","date":"Apr 9, 2011","filler":"metus. Aenean sed pede nec"},
{"index":106,"name":"Indigo Sandoval","country":"Tanzania, United Republic of","phone":"1-190-969-1761","date":"Jun 22, 2011","filler":"Etiam imperdiet dictum magna. Ut tincidunt orci quis lectus."},
{"index":107,"name":"Camille Rios","country":"Eritrea","phone":"1-777-234-8296","date":"Jun 22, 2010","filler":"velit. Quisque varius. Nam porttitor scelerisque neque. Nullam"},
{"index":108,"name":"Giselle Cochran","country":"Colombia","phone":"1-321-318-2359","date":"Jun 28, 2010","filler":"a felis ullamcorper viverra. Maecenas"},
{"index":109,"name":"Justin Morgan","country":"Brunei Darussalam","phone":"1-739-542-9358","date":"Aug 11, 2010","filler":"lectus"},
{"index":110,"name":"Edan Hart","country":"Lesotho","phone":"1-567-699-4120","date":"Jul 27, 2011","filler":"sit"},
{"index":111,"name":"Hakeem Mason","country":"Ireland","phone":"1-537-482-7752","date":"Mar 24, 2010","filler":"Ut tincidunt orci quis lectus. Nullam suscipit,"},
{"index":112,"name":"Lesley Wilcox","country":"Yemen","phone":"1-146-815-7560","date":"Jun 14, 2010","filler":"Proin dolor. Nulla semper tellus id"},
{"index":113,"name":"Sophia Whitley","country":"Germany","phone":"1-346-195-2628","date":"Aug 15, 2011","filler":"ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet"},
{"index":114,"name":"Hiroko Kramer","country":"United States","phone":"1-453-144-5202","date":"Mar 20, 2010","filler":"amet ultricies sem magna"},
{"index":115,"name":"Aimee Chavez","country":"Nicaragua","phone":"1-441-140-5768","date":"May 20, 2011","filler":"Vestibulum ut eros non enim commodo"},
{"index":116,"name":"Reece White","country":"Belarus","phone":"1-736-231-6937","date":"Dec 14, 2011","filler":"vel, venenatis"},
{"index":117,"name":"Hamilton Cooley","country":"Singapore","phone":"1-152-257-1047","date":"Feb 14, 2012","filler":"libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci. Phasellus"},
{"index":118,"name":"Germaine Owen","country":"American Samoa","phone":"1-443-157-2165","date":"Jul 14, 2011","filler":"ac turpis egestas. Aliquam fringilla cursus purus. Nullam scelerisque"},
{"index":119,"name":"Cassandra Emerson","country":"Austria","phone":"1-926-341-9524","date":"Sep 30, 2010","filler":"enim. Mauris quis turpis"},
{"index":120,"name":"Keaton Nicholson","country":"Swaziland","phone":"1-512-928-6403","date":"Mar 17, 2011","filler":"enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare"},
{"index":121,"name":"Chelsea Campbell","country":"Chile","phone":"1-314-838-0332","date":"Apr 2, 2011","filler":"urna. Nunc quis arcu vel quam dignissim pharetra."},
{"index":122,"name":"Igor Frank","country":"Heard Island and Mcdonald Islands","phone":"1-384-576-3414","date":"Jul 5, 2011","filler":"non nisi. Aenean eget metus. In nec orci."},
{"index":123,"name":"Fitzgerald Weber","country":"Cuba","phone":"1-523-906-8092","date":"Sep 4, 2011","filler":"ac metus vitae velit"},
{"index":124,"name":"Vivien Reese","country":"Aruba","phone":"1-309-856-5906","date":"Oct 11, 2011","filler":"scelerisque neque sed sem"},
{"index":125,"name":"Nissim Ortiz","country":"Solomon Islands","phone":"1-910-310-9918","date":"Jul 5, 2011","filler":"vitae sodales nisi"},
{"index":126,"name":"Madaline Chan","country":"Cuba","phone":"1-742-628-2773","date":"Sep 9, 2010","filler":"turpis vitae purus gravida sagittis."},
{"index":127,"name":"Cheyenne Byrd","country":"Swaziland","phone":"1-100-132-0212","date":"Nov 2, 2011","filler":"aliquet libero."},
{"index":128,"name":"Mohammad Porter","country":"Moldova","phone":"1-940-293-9217","date":"Feb 14, 2012","filler":"et, rutrum non, hendrerit id, ante."},
{"index":129,"name":"Ulysses Randall","country":"Poland","phone":"1-777-870-0832","date":"Mar 10, 2011","filler":"nunc"},
{"index":130,"name":"Maisie Randolph","country":"Cayman Islands","phone":"1-265-385-6777","date":"May 12, 2011","filler":"pede. Cum sociis natoque penatibus et"},
{"index":131,"name":"Guy Humphrey","country":"Bangladesh","phone":"1-128-806-9042","date":"Aug 10, 2011","filler":"Nullam enim. Sed"},
{"index":132,"name":"Montana Tillman","country":"Fiji","phone":"1-819-437-9057","date":"Apr 19, 2010","filler":"eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus"},
{"index":133,"name":"Arden Charles","country":"Luxembourg","phone":"1-227-907-5080","date":"Jul 10, 2011","filler":"est, mollis non,"},
{"index":134,"name":"Laura Watts","country":"Albania","phone":"1-871-824-5140","date":"Feb 17, 2011","filler":"iaculis enim, sit amet ornare lectus justo eu arcu. Morbi"},
{"index":135,"name":"Bree Wong","country":"Korea","phone":"1-617-407-1689","date":"Oct 6, 2011","filler":"aliquam arcu. Aliquam ultrices iaculis odio. Nam interdum"},
{"index":136,"name":"Ayanna Fernandez","country":"Antarctica","phone":"1-118-290-6521","date":"Feb 28, 2011","filler":"eros turpis non enim. Mauris quis"},
{"index":137,"name":"Jocelyn Olsen","country":"Bulgaria","phone":"1-932-663-4802","date":"Aug 23, 2010","filler":"quis arcu vel quam dignissim pharetra. Nam ac nulla."},
{"index":138,"name":"Gannon Terrell","country":"Zimbabwe","phone":"1-491-211-2864","date":"May 11, 2011","filler":"dictum"},
{"index":139,"name":"Maggie Malone","country":"Syrian Arab Republic","phone":"1-751-118-3663","date":"Aug 17, 2011","filler":"sed dolor. Fusce mi lorem, vehicula et, rutrum eu,"},
{"index":140,"name":"Bernard Cote","country":"Hungary","phone":"1-153-375-3049","date":"Jun 30, 2010","filler":"vel nisl. Quisque fringilla euismod"},
{"index":141,"name":"Cain Burke","country":"Belarus","phone":"1-185-297-0237","date":"Apr 8, 2010","filler":"nonummy. Fusce fermentum fermentum arcu. Vestibulum ante"},
{"index":142,"name":"Dara Reyes","country":"Ireland","phone":"1-680-117-5470","date":"Dec 16, 2010","filler":"mauris. Morbi non sapien molestie"},
{"index":143,"name":"Latifah Mayo","country":"Hungary","phone":"1-652-371-0843","date":"Jan 20, 2011","filler":"Donec feugiat metus sit amet ante."},
{"index":144,"name":"Lawrence Ross","country":"Timor-leste","phone":"1-147-148-7035","date":"Feb 14, 2012","filler":"nunc nulla"},
{"index":145,"name":"Shelley Oneal","country":"Germany","phone":"1-339-556-7641","date":"Jul 24, 2011","filler":"mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae,"},
{"index":146,"name":"Ezekiel Lloyd","country":"Swaziland","phone":"1-252-957-7381","date":"Jul 26, 2011","filler":"id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque"},
{"index":147,"name":"Skyler Reyes","country":"Mozambique","phone":"1-209-155-7212","date":"Jul 16, 2011","filler":"cursus non, egestas a, dui."},
{"index":148,"name":"Forrest Riley","country":"Nigeria","phone":"1-291-597-2700","date":"Mar 10, 2010","filler":"Fusce feugiat. Lorem ipsum dolor sit amet, consectetuer adipiscing"},
{"index":149,"name":"Uriah Norman","country":"Saint Kitts and Nevis","phone":"1-587-593-0751","date":"Jun 27, 2010","filler":"et"},
{"index":150,"name":"Doris Goff","country":"South Africa","phone":"1-957-296-8139","date":"Jun 19, 2011","filler":"nonummy ut,"},
{"index":151,"name":"Vera Burnett","country":"Thailand","phone":"1-767-517-7143","date":"Jun 8, 2011","filler":"Fusce aliquam, enim nec"},
{"index":152,"name":"Hector Mays","country":"Somalia","phone":"1-243-963-6450","date":"Mar 17, 2011","filler":"consectetuer euismod est arcu ac"},
{"index":153,"name":"Edward Gordon","country":"Spain","phone":"1-204-945-6270","date":"Sep 29, 2010","filler":"magna. Cras convallis convallis dolor. Quisque"},
{"index":154,"name":"Kelly Woodard","country":"Myanmar","phone":"1-411-717-0815","date":"Aug 25, 2011","filler":"amet nulla. Donec non justo. Proin non massa non ante"},
{"index":155,"name":"Cruz Dotson","country":"Venezuela","phone":"1-140-534-1978","date":"Jun 16, 2010","filler":"nascetur"},
{"index":156,"name":"Shelley Livingston","country":"Gabon","phone":"1-585-657-2554","date":"Feb 23, 2012","filler":"nec mauris"},
{"index":157,"name":"Ashton Gay","country":"Singapore","phone":"1-132-195-5042","date":"Apr 5, 2010","filler":"nibh sit amet orci. Ut sagittis lobortis mauris. Suspendisse"},
{"index":158,"name":"Levi Pacheco","country":"Andorra","phone":"1-919-474-1907","date":"Dec 28, 2011","filler":"eu, eleifend nec, malesuada ut,"},
{"index":159,"name":"Drake Lambert","country":"Macao","phone":"1-158-358-8183","date":"May 19, 2011","filler":"blandit viverra. Donec tempus,"},
{"index":160,"name":"Ramona Willis","country":"Guatemala","phone":"1-885-732-1422","date":"Jun 15, 2010","filler":"montes, nascetur"},
{"index":161,"name":"Ivana Hubbard","country":"Cape Verde","phone":"1-957-883-6644","date":"May 13, 2011","filler":"a mi fringilla mi lacinia mattis. Integer eu lacus. Quisque"},
{"index":162,"name":"Callie Pittman","country":"Senegal","phone":"1-556-129-2444","date":"Mar 1, 2012","filler":"justo. Proin non massa non ante bibendum"},
{"index":163,"name":"Bert Cameron","country":"Azerbaijan","phone":"1-305-994-2606","date":"Jan 23, 2011","filler":"amet, consectetuer"},
{"index":164,"name":"Judah Edwards","country":"Romania","phone":"1-372-974-9093","date":"Dec 3, 2011","filler":"facilisis facilisis, magna tellus faucibus"},
{"index":165,"name":"Yuri Mcgowan","country":"Rwanda","phone":"1-188-687-0140","date":"Sep 3, 2011","filler":"ligula. Nullam enim. Sed nulla ante, iaculis nec, eleifend"},
{"index":166,"name":"Bert Frank","country":"Slovakia","phone":"1-855-153-5444","date":"Jan 21, 2011","filler":"luctus vulputate, nisi sem semper erat, in consectetuer ipsum"},
{"index":167,"name":"Beatrice Schultz","country":"Liechtenstein","phone":"1-883-751-4538","date":"Jun 26, 2010","filler":"Aliquam vulputate ullamcorper magna. Sed eu eros."},
{"index":168,"name":"Ina Raymond","country":"Iraq","phone":"1-350-865-1205","date":"Jan 7, 2012","filler":"purus. Nullam scelerisque neque sed sem egestas blandit."},
{"index":169,"name":"Joshua Shepherd","country":"Panama","phone":"1-965-430-5868","date":"Mar 19, 2010","filler":"ut quam vel sapien imperdiet ornare. In"},
{"index":170,"name":"Yasir Burns","country":"Angola","phone":"1-436-412-9359","date":"Aug 10, 2010","filler":"molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare,"},
{"index":171,"name":"Samuel Holcomb","country":"Brazil","phone":"1-547-171-1397","date":"Feb 25, 2011","filler":"eu tellus. Phasellus"},
{"index":172,"name":"Aimee Clemons","country":"Saint Kitts and Nevis","phone":"1-151-692-9964","date":"Feb 19, 2011","filler":"ligula. Nullam enim. Sed nulla ante, iaculis nec, eleifend non,"},
{"index":173,"name":"Preston Preston","country":"Virgin Islands, British","phone":"1-824-731-8457","date":"Aug 2, 2010","filler":"vel pede blandit"},
{"index":174,"name":"Gwendolyn Daniel","country":"Turks and Caicos Islands","phone":"1-224-294-4840","date":"Oct 12, 2011","filler":"penatibus et magnis dis"},
{"index":175,"name":"Maile Booker","country":"Bahamas","phone":"1-693-166-1407","date":"Dec 30, 2011","filler":"lectus justo eu"},
{"index":176,"name":"Jameson Mayo","country":"Macedonia","phone":"1-467-896-3357","date":"Nov 14, 2010","filler":"nulla magna, malesuada vel, convallis"},
{"index":177,"name":"Basil Bryan","country":"United States Minor Outlying Islands","phone":"1-279-575-1902","date":"Apr 19, 2010","filler":"cubilia Curae; Phasellus ornare. Fusce mollis. Duis"},
{"index":178,"name":"Kalia Bowen","country":"Solomon Islands","phone":"1-145-834-4680","date":"Jun 24, 2010","filler":"mauris. Morbi non sapien molestie"},
{"index":179,"name":"Teegan Lindsey","country":"Honduras","phone":"1-861-718-3273","date":"Oct 16, 2011","filler":"Quisque ac libero nec ligula consectetuer"},
{"index":180,"name":"Leilani Allen","country":"Ireland","phone":"1-408-982-3381","date":"Jun 4, 2010","filler":"semper et, lacinia vitae,"},
{"index":181,"name":"Hedley Fischer","country":"Thailand","phone":"1-815-897-6204","date":"Apr 30, 2010","filler":"vulputate mauris sagittis placerat. Cras dictum"},
{"index":182,"name":"Penelope Christian","country":"Malta","phone":"1-255-144-2771","date":"Nov 29, 2011","filler":"gravida sagittis. Duis gravida. Praesent eu nulla at sem"},
{"index":183,"name":"Katell Ferrell","country":"Jordan","phone":"1-405-994-7677","date":"May 12, 2010","filler":"Nunc"},
{"index":184,"name":"Eliana Sanders","country":"Kyrgyzstan","phone":"1-890-405-8326","date":"Nov 18, 2011","filler":"Nunc mauris elit, dictum eu,"},
{"index":185,"name":"Rahim Arnold","country":"Korea","phone":"1-345-834-3110","date":"Feb 1, 2012","filler":"nonummy ut, molestie in, tempus eu, ligula. Aenean euismod"},
{"index":186,"name":"Flynn Chambers","country":"Andorra","phone":"1-890-840-3236","date":"May 11, 2011","filler":"malesuada vel, convallis in, cursus et, eros. Proin ultrices."},
{"index":187,"name":"Sean Mosley","country":"Togo","phone":"1-383-867-3984","date":"Mar 13, 2010","filler":"Nulla"},
{"index":188,"name":"Micah Gentry","country":"Swaziland","phone":"1-718-792-7351","date":"Mar 26, 2010","filler":"ligula."},
{"index":189,"name":"Yasir Small","country":"Antarctica","phone":"1-819-295-8356","date":"Feb 8, 2011","filler":"cursus in, hendrerit consectetuer, cursus et, magna. Praesent"},
{"index":190,"name":"Hannah Howell","country":"Turks and Caicos Islands","phone":"1-310-180-3548","date":"Jul 3, 2011","filler":"dolor elit, pellentesque a, facilisis non, bibendum"},
{"index":191,"name":"Constance Murphy","country":"Estonia","phone":"1-354-264-7573","date":"Nov 15, 2011","filler":"dapibus id, blandit"},
{"index":192,"name":"Ulric Mitchell","country":"Venezuela","phone":"1-881-999-9253","date":"Nov 15, 2010","filler":"augue ac"},
{"index":193,"name":"Quinlan Gardner","country":"Swaziland","phone":"1-153-570-8466","date":"Apr 1, 2010","filler":"sem egestas blandit. Nam nulla magna, malesuada vel, convallis"},
{"index":194,"name":"Cade Prince","country":"Liberia","phone":"1-153-242-1456","date":"Feb 8, 2012","filler":"lorem fringilla ornare placerat, orci lacus vestibulum lorem,"},
{"index":195,"name":"Sharon Levy","country":"Zambia","phone":"1-755-103-1987","date":"Aug 3, 2011","filler":"eu tellus. Phasellus elit pede, malesuada"},
{"index":196,"name":"Levi Paul","country":"Guinea","phone":"1-189-404-7182","date":"Sep 8, 2011","filler":"magna tellus faucibus leo, in lobortis tellus justo sit"},
{"index":197,"name":"Wyoming Ochoa","country":"Bulgaria","phone":"1-937-547-8576","date":"Feb 17, 2011","filler":"vehicula. Pellentesque tincidunt"},
{"index":198,"name":"Dominique Sutton","country":"Western Sahara","phone":"1-698-648-0108","date":"Mar 19, 2010","filler":"feugiat tellus lorem eu metus."},
{"index":199,"name":"Ivory Hester","country":"Luxembourg","phone":"1-638-393-0787","date":"Sep 17, 2010","filler":"eu, eleifend nec, malesuada"},
{"index":200,"name":"Alyssa Newman","country":"Bahrain","phone":"1-130-884-6866","date":"Sep 24, 2011","filler":"aliquet magna a neque. Nullam ut nisi a"}];

SCTableDemo.parseSampleData = function parseSampleData() {
  var result = [];
  var columns = SCTableDemo.sampleDataColumns;
  
  SCTableDemo.sampleData.forEach(function(row, index) {
    result.push(SC.Object.create(row));
  }, this);

  SCTableDemo.set('sampleRows', result);
  SCTableDemo.set('sampleData', null);
};
