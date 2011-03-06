/*globals SCTableDemo SCTable*/

/*
  An exceedingly ugly way to generate some sample data. (Source string is randomly generated.  None of it is real.)
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
    name: "Date",
    valueKey: 'date',
    width: 150
  }),
  SC.Object.create(SCTable.Column, {
    name: "Description",
    valueKey: 'description',
    width: 250
  })
];

SCTableDemo.sampleRows = [];

SCTableDemo.sampleData = "1|Lucy Bush|Barbados|1-397-773-1621|Oct 14, 2011|Fusce~ \
2|Felicia Ortiz|Netherlands Antilles|1-297-498-1204|Aug 1, 2010|lorem, eget mollis lectus pede et risus. Quisque~ \
3|Samuel Hampton|American Samoa|1-369-937-3535|Apr 21, 2011|orci sem eget massa. Suspendisse eleifend. Cras~ \
4|Lila Vincent|Bhutan|1-300-949-8628|Dec 4, 2011|risus.~ \
5|Orlando Vaughn|Indonesia|1-710-714-4497|May 25, 2010|cursus vestibulum. Mauris magna. Duis dignissim tempor arcu. Vestibulum ut~ \
6|Claire Mcintosh|Liberia|1-385-470-3676|May 14, 2010|ac mi eleifend egestas. Sed~ \
7|Mallory Copeland|Saint Helena|1-199-260-5045|Sep 3, 2010|sagittis lobortis mauris. Suspendisse aliquet molestie tellus. Aenean egestas~ \
8|Ava Boone|Barbados|1-639-276-1039|Apr 19, 2011|sem mollis dui, in sodales elit erat~ \
9|Oscar Gay|Zimbabwe|1-539-446-4079|Oct 29, 2011|Praesent interdum ligula eu enim. Etiam~ \
10|Hillary Myers|Palau|1-520-438-0594|Dec 19, 2010|ante bibendum ullamcorper. Duis cursus,~ \
11|Ciaran Conway|United States Minor Outlying Islands|1-263-208-7584|Oct 23, 2010|convallis est, vitae sodales nisi~ \
12|Ann Sherman|Bouvet Island|1-733-877-6725|Sep 30, 2010|Curae; Donec tincidunt.~ \
13|Caesar Hays|Ukraine|1-166-476-2511|May 7, 2010|malesuada vel, venenatis vel, faucibus id, libero. Donec consectetuer mauris~ \
14|Leslie Baker|Kuwait|1-777-155-7130|Jul 8, 2010|Fusce mi lorem, vehicula et, rutrum eu,~ \
15|Rhona Shepherd|Tunisia|1-795-432-0572|May 24, 2011|in faucibus orci luctus et ultrices posuere cubilia~ \
16|Shaine Frank|Saint Vincent and The Grenadines|1-305-200-6829|Nov 12, 2011|vulputate, lacus. Cras interdum. Nunc sollicitudin commodo ipsum. Suspendisse non~ \
17|Imelda Reynolds|Senegal|1-447-880-0868|Jun 1, 2010|quam~ \
18|Leah Vang|Oman|1-426-837-9961|Oct 18, 2011|mauris id sapien. Cras dolor dolor, tempus non, lacinia~ \
19|Brittany Garrett|Hong Kong|1-968-657-6553|Jul 19, 2010|mus. Aenean eget magna. Suspendisse~ \
20|Mohammad Baird|Mexico|1-438-121-8114|Jul 1, 2010|vehicula risus. Nulla eget~ \
21|Brielle Kelley|Guatemala|1-540-405-1717|Dec 29, 2010|porttitor~ \
22|Griffith Parker|Myanmar|1-909-702-9830|Oct 29, 2010|lacinia. Sed congue, elit~ \
23|Armand Koch|Djibouti|1-406-546-9531|Apr 11, 2010|malesuada fringilla est. Mauris~ \
24|Mikayla Nielsen|Benin|1-361-332-4218|Jan 11, 2011|nec luctus felis~ \
25|Leilani Gonzales|Albania|1-870-524-1204|Jun 18, 2011|ligula. Aliquam erat volutpat.~ \
26|Tanisha Williamson|Armenia|1-926-249-3924|Oct 23, 2010|Sed eu nibh vulputate mauris sagittis placerat. Cras~ \
27|Whitney Hancock|Timor-leste|1-926-168-4805|Sep 17, 2011|porttitor scelerisque neque. Nullam~ \
28|Warren Conrad|Guatemala|1-916-631-6608|Nov 25, 2011|in, cursus~ \
29|Iliana Bennett|Dominican Republic|1-304-901-8599|May 25, 2011|Phasellus~ \
30|Fitzgerald Barry|Israel|1-706-369-4354|Sep 24, 2010|natoque penatibus et~ \
31|Geraldine Morgan|Rwanda|1-697-197-1731|Sep 28, 2011|faucibus lectus, a sollicitudin orci sem eget~ \
32|Galena Atkins|Kazakhstan|1-774-401-2448|Apr 14, 2011|quis urna. Nunc quis arcu vel quam dignissim pharetra. Nam~ \
33|Kenyon Dyer|Guam|1-383-192-8091|Jul 28, 2010|magna a~ \
34|Kim Lawson|Pitcairn|1-124-564-6981|May 18, 2011|ipsum. Suspendisse sagittis. Nullam vitae diam. Proin dolor. Nulla~ \
35|Stewart Gregory|Andorra|1-368-567-7587|Dec 19, 2011|accumsan sed, facilisis vitae, orci. Phasellus dapibus~ \
36|Indigo Copeland|Moldova|1-228-565-9348|Sep 22, 2010|Donec sollicitudin adipiscing ligula. Aenean gravida~ \
37|Lee Harrell|Panama|1-663-510-2951|Feb 19, 2011|vulputate eu, odio. Phasellus at augue id~ \
38|Chelsea Briggs|Guyana|1-725-672-1766|Mar 22, 2011|nec, cursus a, enim. Suspendisse aliquet,~ \
39|Zenia Clayton|Malaysia|1-771-123-0525|Mar 16, 2010|id enim. Curabitur massa. Vestibulum accumsan neque~ \
40|Neville Snow|American Samoa|1-162-620-9485|Feb 6, 2012|a sollicitudin~ \
41|Nell Bryan|Monaco|1-373-476-7719|May 24, 2011|eleifend egestas. Sed pharetra,~ \
42|Silas Bailey|Palestinian Territory, Occupied|1-813-275-1609|Sep 18, 2010|semper. Nam tempor~ \
43|Hayley Washington|Djibouti|1-910-458-9261|Feb 20, 2011|felis, adipiscing fringilla,~ \
44|Wang Blevins|Venezuela|1-690-908-5255|Jan 25, 2012|aliquet odio. Etiam~ \
45|Maryam Meyer|Qatar|1-958-994-7973|Jun 4, 2011|ullamcorper~ \
46|Dorian Winters|Antarctica|1-369-350-1036|Jul 31, 2011|iaculis nec, eleifend non, dapibus rutrum,~ \
47|Iris Curtis|Cayman Islands|1-217-107-5762|Oct 31, 2011|lacinia~ \
48|Clio Gutierrez|Nepal|1-362-397-2086|May 7, 2010|dapibus ligula. Aliquam erat volutpat. Nulla dignissim. Maecenas~ \
49|Cairo Castillo|Morocco|1-337-137-7843|Mar 2, 2012|et, magna.~ \
50|Aladdin Gregory|Vanuatu|1-665-884-6154|Jul 24, 2010|velit. Cras lorem lorem, luctus ut, pellentesque eget,~ \
51|Ronan Stevenson|Iceland|1-417-221-8003|Jan 26, 2012|enim. Mauris quis turpis vitae~ \
52|Ulysses Hooper|Macedonia|1-801-499-9504|Mar 15, 2010|mauris a nunc. In at pede. Cras vulputate velit eu~ \
53|Nelle Salinas|Paraguay|1-128-831-9119|Mar 23, 2010|Ut tincidunt orci quis lectus. Nullam~ \
54|Ayanna Higgins|Antigua and Barbuda|1-621-770-6667|Mar 11, 2011|justo sit~ \
55|Leroy Sanchez|Indonesia|1-396-279-2614|Oct 20, 2011|vel, faucibus id, libero. Donec consectetuer mauris~ \
56|Aspen Orr|Australia|1-123-200-2778|Apr 17, 2011|cursus et, eros. Proin ultrices.~ \
57|Jessamine Blake|Palestinian Territory, Occupied|1-935-553-4806|Aug 21, 2011|cursus, diam at~ \
58|Darrel Gross|French Polynesia|1-345-666-7934|Oct 12, 2011|nunc. In at pede. Cras vulputate velit eu sem.~ \
59|Gregory Fry|Tokelau|1-122-677-9259|Mar 29, 2010|mi tempor lorem, eget mollis lectus pede et risus.~ \
60|Linda Bolton|Egypt|1-937-504-1734|Jan 19, 2012|lacus. Mauris non~ \
61|Dorothy Molina|Malaysia|1-267-434-1277|Feb 23, 2012|iaculis nec, eleifend~ \
62|Minerva Stevenson|Netherlands|1-970-620-0474|Jan 3, 2012|senectus et netus et malesuada fames ac turpis egestas.~ \
63|Mufutau Carson|Peru|1-233-976-4991|Dec 10, 2010|nisl sem, consequat nec, mollis vitae, posuere at,~ \
64|Naomi Hartman|Botswana|1-338-391-3061|Dec 19, 2011|Ut sagittis lobortis mauris. Suspendisse aliquet~ \
65|Clare Davenport|New Caledonia|1-949-346-9869|Jan 3, 2012|sodales at, velit. Pellentesque ultricies dignissim lacus. Aliquam rutrum lorem~ \
66|Carol Oliver|Saint Helena|1-390-230-3619|Apr 9, 2010|fringilla ornare placerat, orci lacus vestibulum lorem, sit~ \
67|Jaime Wooten|Tokelau|1-183-117-7153|Jun 30, 2010|non~ \
68|Nichole Contreras|Egypt|1-542-565-5027|Sep 9, 2010|laoreet~ \
69|Hadley Hutchinson|Wallis and Futuna|1-358-650-3319|Nov 3, 2011|congue a, aliquet vel, vulputate eu, odio.~ \
70|Jin Hammond|Guinea|1-788-935-5957|Mar 7, 2010|nulla ante, iaculis nec, eleifend non, dapibus~ \
71|Philip Young|Albania|1-725-681-6147|Nov 18, 2011|est~ \
72|Vladimir Mccarty|Macedonia|1-333-236-6861|Apr 22, 2010|eu dolor egestas rhoncus. Proin nisl sem,~ \
73|Paki Hancock|Denmark|1-714-373-4359|May 29, 2011|non, lacinia~ \
74|Amery Best|Croatia|1-635-958-6172|Jun 26, 2010|lobortis quam a felis~ \
75|Jaime Calhoun|Rwanda|1-788-215-5690|Dec 29, 2010|quam quis diam. Pellentesque habitant morbi~ \
76|Octavius Maxwell|British Indian Ocean Territory|1-915-500-3620|Mar 29, 2010|dolor, tempus non, lacinia at, iaculis quis, pede. Praesent~ \
77|Imelda Garrett|Sao Tome and Principe|1-206-128-6745|Aug 3, 2010|hendrerit a, arcu. Sed et libero. Proin mi. Aliquam~ \
78|Levi Manning|Mali|1-756-397-2335|Dec 2, 2011|placerat, augue. Sed molestie.~ \
79|Carol Schmidt|Monaco|1-996-608-4658|Jun 25, 2011|massa. Suspendisse~ \
80|Ross Ramos|Virgin Islands, British|1-444-174-7971|Apr 14, 2011|a, aliquet vel, vulputate eu, odio.~ \
81|Heidi Obrien|Zambia|1-969-610-3669|Dec 6, 2011|aliquet. Phasellus fermentum convallis ligula.~ \
82|Hammett England|Macedonia|1-469-866-2460|Nov 22, 2010|risus. In mi pede, nonummy ut,~ \
83|Cora Whitehead|Timor-leste|1-294-256-2928|Apr 20, 2011|sed consequat auctor, nunc nulla vulputate dui, nec tempus~ \
84|Lester Elliott|Andorra|1-266-143-8774|Aug 31, 2010|auctor ullamcorper, nisl arcu iaculis enim, sit amet~ \
85|Nathaniel Winters|Egypt|1-611-137-7660|Oct 1, 2011|Quisque fringilla euismod enim. Etiam~ \
86|Ross Armstrong|Seychelles|1-814-528-7055|Oct 29, 2010|massa. Quisque porttitor eros nec tellus.~ \
87|Rina Daniel|Falkland Islands (Malvinas)|1-174-388-9646|Jun 3, 2010|vulputate, nisi sem semper erat, in consectetuer~ \
88|Caleb Lamb|Uganda|1-930-482-1637|Jan 17, 2012|et malesuada~ \
89|Aline Waller|Bahrain|1-398-827-6231|Nov 30, 2011|et malesuada fames ac turpis egestas. Fusce aliquet magna~ \
90|Anne Adams|Moldova|1-999-127-3436|Dec 30, 2011|enim, gravida sit~ \
91|Joseph Deleon|Jordan|1-654-437-1095|Feb 7, 2012|in sodales~ \
92|Linda Davenport|Sierra Leone|1-227-220-8542|Mar 9, 2010|est. Nunc ullamcorper,~ \
93|Quemby Parks|Ukraine|1-224-678-3882|May 21, 2010|aliquam adipiscing lacus. Ut nec~ \
94|Azalia Albert|Czech Republic|1-814-636-6121|Dec 9, 2010|adipiscing non, luctus sit amet,~ \
95|September Conrad|Cambodia|1-744-301-0499|Oct 7, 2011|Proin velit. Sed malesuada augue ut lacus. Nulla~ \
96|Vance Ross|Iceland|1-265-638-2905|Nov 15, 2010|rutrum~ \
97|Willa Wade|Philippines|1-171-591-6056|May 20, 2011|sit amet ornare lectus justo eu arcu. Morbi sit amet~ \
98|Allen Sykes|Benin|1-407-160-9900|Mar 6, 2011|pellentesque. Sed dictum. Proin eget~ \
99|Kameko Hammond|Argentina|1-247-307-4670|Oct 13, 2010|Ut semper pretium~ \
100|Gwendolyn Gardner|Mozambique|1-576-382-3723|Jan 23, 2011|vel, faucibus id, libero. Donec consectetuer mauris id~ \
101|Iris Dudley|Algeria|1-544-375-9216|Mar 20, 2011|sit amet, faucibus ut,~ \
102|Hayley Pearson|Sao Tome and Principe|1-915-643-9701|Jul 29, 2010|pharetra,~ \
103|Quinlan Kemp|Barbados|1-895-323-7159|Dec 27, 2010|vulputate, posuere vulputate, lacus. Cras interdum. Nunc sollicitudin commodo~ \
104|Hanae Cruz|Norfolk Island|1-228-782-0791|Jun 10, 2010|massa rutrum magna. Cras convallis convallis dolor. Quisque tincidunt pede~ \
105|Walter Norris|Macao|1-144-676-8584|Apr 9, 2011|metus. Aenean sed pede nec~ \
106|Indigo Sandoval|Tanzania, United Republic of|1-190-969-1761|Jun 22, 2011|Etiam imperdiet dictum magna. Ut tincidunt orci quis lectus.~ \
107|Camille Rios|Eritrea|1-777-234-8296|Jun 22, 2010|velit. Quisque varius. Nam porttitor scelerisque neque. Nullam~ \
108|Giselle Cochran|Colombia|1-321-318-2359|Jun 28, 2010|a felis ullamcorper viverra. Maecenas~ \
109|Justin Morgan|Brunei Darussalam|1-739-542-9358|Aug 11, 2010|lectus~ \
110|Edan Hart|Lesotho|1-567-699-4120|Jul 27, 2011|sit~ \
111|Hakeem Mason|Ireland|1-537-482-7752|Mar 24, 2010|Ut tincidunt orci quis lectus. Nullam suscipit,~ \
112|Lesley Wilcox|Yemen|1-146-815-7560|Jun 14, 2010|Proin dolor. Nulla semper tellus id~ \
113|Sophia Whitley|Germany|1-346-195-2628|Aug 15, 2011|ut mi. Duis risus odio, auctor vitae, aliquet nec, imperdiet~ \
114|Hiroko Kramer|United States|1-453-144-5202|Mar 20, 2010|amet ultricies sem magna~ \
115|Aimee Chavez|Nicaragua|1-441-140-5768|May 20, 2011|Vestibulum ut eros non enim commodo~ \
116|Reece White|Belarus|1-736-231-6937|Dec 14, 2011|vel, venenatis~ \
117|Hamilton Cooley|Singapore|1-152-257-1047|Feb 14, 2012|libero mauris, aliquam eu, accumsan sed, facilisis vitae, orci. Phasellus~ \
118|Germaine Owen|American Samoa|1-443-157-2165|Jul 14, 2011|ac turpis egestas. Aliquam fringilla cursus purus. Nullam scelerisque~ \
119|Cassandra Emerson|Austria|1-926-341-9524|Sep 30, 2010|enim. Mauris quis turpis~ \
120|Keaton Nicholson|Swaziland|1-512-928-6403|Mar 17, 2011|enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque ornare~ \
121|Chelsea Campbell|Chile|1-314-838-0332|Apr 2, 2011|urna. Nunc quis arcu vel quam dignissim pharetra.~ \
122|Igor Frank|Heard Island and Mcdonald Islands|1-384-576-3414|Jul 5, 2011|non nisi. Aenean eget metus. In nec orci.~ \
123|Fitzgerald Weber|Cuba|1-523-906-8092|Sep 4, 2011|ac metus vitae velit~ \
124|Vivien Reese|Aruba|1-309-856-5906|Oct 11, 2011|scelerisque neque sed sem~ \
125|Nissim Ortiz|Solomon Islands|1-910-310-9918|Jul 5, 2011|vitae sodales nisi~ \
126|Madaline Chan|Cuba|1-742-628-2773|Sep 9, 2010|turpis vitae purus gravida sagittis.~ \
127|Cheyenne Byrd|Swaziland|1-100-132-0212|Nov 2, 2011|aliquet libero.~ \
128|Mohammad Porter|Moldova|1-940-293-9217|Feb 14, 2012|et, rutrum non, hendrerit id, ante.~ \
129|Ulysses Randall|Poland|1-777-870-0832|Mar 10, 2011|nunc~ \
130|Maisie Randolph|Cayman Islands|1-265-385-6777|May 12, 2011|pede. Cum sociis natoque penatibus et~ \
131|Guy Humphrey|Bangladesh|1-128-806-9042|Aug 10, 2011|Nullam enim. Sed~ \
132|Montana Tillman|Fiji|1-819-437-9057|Apr 19, 2010|eu, accumsan sed, facilisis vitae, orci. Phasellus dapibus~ \
133|Arden Charles|Luxembourg|1-227-907-5080|Jul 10, 2011|est, mollis non,~ \
134|Laura Watts|Albania|1-871-824-5140|Feb 17, 2011|iaculis enim, sit amet ornare lectus justo eu arcu. Morbi~ \
135|Bree Wong|Korea|1-617-407-1689|Oct 6, 2011|aliquam arcu. Aliquam ultrices iaculis odio. Nam interdum~ \
136|Ayanna Fernandez|Antarctica|1-118-290-6521|Feb 28, 2011|eros turpis non enim. Mauris quis~ \
137|Jocelyn Olsen|Bulgaria|1-932-663-4802|Aug 23, 2010|quis arcu vel quam dignissim pharetra. Nam ac nulla.~ \
138|Gannon Terrell|Zimbabwe|1-491-211-2864|May 11, 2011|dictum~ \
139|Maggie Malone|Syrian Arab Republic|1-751-118-3663|Aug 17, 2011|sed dolor. Fusce mi lorem, vehicula et, rutrum eu,~ \
140|Bernard Cote|Hungary|1-153-375-3049|Jun 30, 2010|vel nisl. Quisque fringilla euismod~ \
141|Cain Burke|Belarus|1-185-297-0237|Apr 8, 2010|nonummy. Fusce fermentum fermentum arcu. Vestibulum ante~ \
142|Dara Reyes|Ireland|1-680-117-5470|Dec 16, 2010|mauris. Morbi non sapien molestie~ \
143|Latifah Mayo|Hungary|1-652-371-0843|Jan 20, 2011|Donec feugiat metus sit amet ante.~ \
144|Lawrence Ross|Timor-leste|1-147-148-7035|Feb 14, 2012|nunc nulla~ \
145|Shelley Oneal|Germany|1-339-556-7641|Jul 24, 2011|mollis. Phasellus libero mauris, aliquam eu, accumsan sed, facilisis vitae,~ \
146|Ezekiel Lloyd|Swaziland|1-252-957-7381|Jul 26, 2011|id enim. Curabitur massa. Vestibulum accumsan neque et nunc. Quisque~ \
147|Skyler Reyes|Mozambique|1-209-155-7212|Jul 16, 2011|cursus non, egestas a, dui.~ \
148|Forrest Riley|Nigeria|1-291-597-2700|Mar 10, 2010|Fusce feugiat. Lorem ipsum dolor sit amet, consectetuer adipiscing~ \
149|Uriah Norman|Saint Kitts and Nevis|1-587-593-0751|Jun 27, 2010|et~ \
150|Doris Goff|South Africa|1-957-296-8139|Jun 19, 2011|nonummy ut,~ \
151|Vera Burnett|Thailand|1-767-517-7143|Jun 8, 2011|Fusce aliquam, enim nec~ \
152|Hector Mays|Somalia|1-243-963-6450|Mar 17, 2011|consectetuer euismod est arcu ac~ \
153|Edward Gordon|Spain|1-204-945-6270|Sep 29, 2010|magna. Cras convallis convallis dolor. Quisque~ \
154|Kelly Woodard|Myanmar|1-411-717-0815|Aug 25, 2011|amet nulla. Donec non justo. Proin non massa non ante~ \
155|Cruz Dotson|Venezuela|1-140-534-1978|Jun 16, 2010|nascetur~ \
156|Shelley Livingston|Gabon|1-585-657-2554|Feb 23, 2012|nec mauris~ \
157|Ashton Gay|Singapore|1-132-195-5042|Apr 5, 2010|nibh sit amet orci. Ut sagittis lobortis mauris. Suspendisse~ \
158|Levi Pacheco|Andorra|1-919-474-1907|Dec 28, 2011|eu, eleifend nec, malesuada ut,~ \
159|Drake Lambert|Macao|1-158-358-8183|May 19, 2011|blandit viverra. Donec tempus,~ \
160|Ramona Willis|Guatemala|1-885-732-1422|Jun 15, 2010|montes, nascetur~ \
161|Ivana Hubbard|Cape Verde|1-957-883-6644|May 13, 2011|a mi fringilla mi lacinia mattis. Integer eu lacus. Quisque~ \
162|Callie Pittman|Senegal|1-556-129-2444|Mar 1, 2012|justo. Proin non massa non ante bibendum~ \
163|Bert Cameron|Azerbaijan|1-305-994-2606|Jan 23, 2011|amet, consectetuer~ \
164|Judah Edwards|Romania|1-372-974-9093|Dec 3, 2011|facilisis facilisis, magna tellus faucibus~ \
165|Yuri Mcgowan|Rwanda|1-188-687-0140|Sep 3, 2011|ligula. Nullam enim. Sed nulla ante, iaculis nec, eleifend~ \
166|Bert Frank|Slovakia|1-855-153-5444|Jan 21, 2011|luctus vulputate, nisi sem semper erat, in consectetuer ipsum~ \
167|Beatrice Schultz|Liechtenstein|1-883-751-4538|Jun 26, 2010|Aliquam vulputate ullamcorper magna. Sed eu eros.~ \
168|Ina Raymond|Iraq|1-350-865-1205|Jan 7, 2012|purus. Nullam scelerisque neque sed sem egestas blandit.~ \
169|Joshua Shepherd|Panama|1-965-430-5868|Mar 19, 2010|ut quam vel sapien imperdiet ornare. In~ \
170|Yasir Burns|Angola|1-436-412-9359|Aug 10, 2010|molestie orci tincidunt adipiscing. Mauris molestie pharetra nibh. Aliquam ornare,~ \
171|Samuel Holcomb|Brazil|1-547-171-1397|Feb 25, 2011|eu tellus. Phasellus~ \
172|Aimee Clemons|Saint Kitts and Nevis|1-151-692-9964|Feb 19, 2011|ligula. Nullam enim. Sed nulla ante, iaculis nec, eleifend non,~ \
173|Preston Preston|Virgin Islands, British|1-824-731-8457|Aug 2, 2010|vel pede blandit~ \
174|Gwendolyn Daniel|Turks and Caicos Islands|1-224-294-4840|Oct 12, 2011|penatibus et magnis dis~ \
175|Maile Booker|Bahamas|1-693-166-1407|Dec 30, 2011|lectus justo eu~ \
176|Jameson Mayo|Macedonia|1-467-896-3357|Nov 14, 2010|nulla magna, malesuada vel, convallis~ \
177|Basil Bryan|United States Minor Outlying Islands|1-279-575-1902|Apr 19, 2010|cubilia Curae; Phasellus ornare. Fusce mollis. Duis~ \
178|Kalia Bowen|Solomon Islands|1-145-834-4680|Jun 24, 2010|mauris. Morbi non sapien molestie~ \
179|Teegan Lindsey|Honduras|1-861-718-3273|Oct 16, 2011|Quisque ac libero nec ligula consectetuer~ \
180|Leilani Allen|Ireland|1-408-982-3381|Jun 4, 2010|semper et, lacinia vitae,~ \
181|Hedley Fischer|Thailand|1-815-897-6204|Apr 30, 2010|vulputate mauris sagittis placerat. Cras dictum~ \
182|Penelope Christian|Malta|1-255-144-2771|Nov 29, 2011|gravida sagittis. Duis gravida. Praesent eu nulla at sem~ \
183|Katell Ferrell|Jordan|1-405-994-7677|May 12, 2010|Nunc~ \
184|Eliana Sanders|Kyrgyzstan|1-890-405-8326|Nov 18, 2011|Nunc mauris elit, dictum eu,~ \
185|Rahim Arnold|Korea|1-345-834-3110|Feb 1, 2012|nonummy ut, molestie in, tempus eu, ligula. Aenean euismod~ \
186|Flynn Chambers|Andorra|1-890-840-3236|May 11, 2011|malesuada vel, convallis in, cursus et, eros. Proin ultrices.~ \
187|Sean Mosley|Togo|1-383-867-3984|Mar 13, 2010|Nulla~ \
188|Micah Gentry|Swaziland|1-718-792-7351|Mar 26, 2010|ligula.~ \
189|Yasir Small|Antarctica|1-819-295-8356|Feb 8, 2011|cursus in, hendrerit consectetuer, cursus et, magna. Praesent~ \
190|Hannah Howell|Turks and Caicos Islands|1-310-180-3548|Jul 3, 2011|dolor elit, pellentesque a, facilisis non, bibendum~ \
191|Constance Murphy|Estonia|1-354-264-7573|Nov 15, 2011|dapibus id, blandit~ \
192|Ulric Mitchell|Venezuela|1-881-999-9253|Nov 15, 2010|augue ac~ \
193|Quinlan Gardner|Swaziland|1-153-570-8466|Apr 1, 2010|sem egestas blandit. Nam nulla magna, malesuada vel, convallis~ \
194|Cade Prince|Liberia|1-153-242-1456|Feb 8, 2012|lorem fringilla ornare placerat, orci lacus vestibulum lorem,~ \
195|Sharon Levy|Zambia|1-755-103-1987|Aug 3, 2011|eu tellus. Phasellus elit pede, malesuada~ \
196|Levi Paul|Guinea|1-189-404-7182|Sep 8, 2011|magna tellus faucibus leo, in lobortis tellus justo sit~ \
197|Wyoming Ochoa|Bulgaria|1-937-547-8576|Feb 17, 2011|vehicula. Pellentesque tincidunt~ \
198|Dominique Sutton|Western Sahara|1-698-648-0108|Mar 19, 2010|feugiat tellus lorem eu metus.~ \
199|Ivory Hester|Luxembourg|1-638-393-0787|Sep 17, 2010|eu, eleifend nec, malesuada~ \
200|Alyssa Newman|Bahrain|1-130-884-6866|Sep 24, 2011|aliquet magna a neque. Nullam ut nisi a";

SCTableDemo.parseSampleData = function parseSampleData() {
  var lines = SCTableDemo.sampleData.split('~');
  var result = [];
  var columns = SCTableDemo.sampleDataColumns;
  
  lines.forEach(function(line, index) {
    var words = line.split('|');
    var obj = {};

    for (var i = 0; i < columns.length; i++) {
      obj[columns[i].get('valueKey')] = (i === 0) ? words[i] * 1 : words[i];
    }
    
    result.push(SC.Object.create(obj));
  }, this);

  SCTableDemo.set('sampleRows', result);
  SCTableDemo.set('sampleData', null);
};
