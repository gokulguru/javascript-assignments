function book(data) {
    this.small_image_url = ko.observable(data.getElementsByTagName("small_image_url")[0].textContent);
    this.author = ko.observable(data.getElementsByTagName("best_book")[0].getElementsByTagName("author")[0].getElementsByTagName("name")[0].textContent);
	this.Rating =ko.observable(data.getElementsByTagName("average_rating")[0].textContent);
	this.title=ko.observable(data.getElementsByTagName("best_book")[0].getElementsByTagName("title")[0].textContent);
}
function page(data)
{
	this.pageNumber= ko.observable(data.pageNumber);
	this.isActive= ko.observable(data.isActive);
	this.classActive= ko.observable(data.classActive);
}
function BooksListViewModel() {
    // Data
    var self = this;
    self.books = ko.observableArray([]);
    self.searchTitle = ko.observable();
   self.totalSize = ko.observable();
 self.pages= ko.observableArray([]);


self.search  = function() {
	var url = 'https://www.goodreads.com/search/index.xml?key=UpBHaR7fwh6PRIL078f4Rg&search%5Bfield%5D=title&'+'&q='+ self.searchTitle()+'&page=1';
   $.get(url, function(data){
	  self.totalSize(  Math.round(data.firstElementChild.getElementsByTagName("total-results")[0].textContent /20));
	  if((data.firstElementChild.getElementsByTagName("total-results")[0].textContent %20) <10)
		  self.totalSize( self.totalSize()+ 1);
	

for(var i = 1; i <=  self.totalSize(); i++){
	if(i==1)
		 self.pages.push(new page({ pageNumber: i,isActive:true ,classActive:' active'}));
	 else
	 self.pages.push(new page({ pageNumber: i,isActive:false }));
    
}
	    self.books($.map(data.firstElementChild.getElementsByTagName("work"), function (result) {
               return new book(result);
          }));
   });
    };
	self.searchWithPage  = function(page) {
		$.map(self.pages(),function(x) { 
  x.isActive = false; 
  return x
});
if(page)
{
		page.isActive=true;
		page.classActive='active'
	var url = 'https://www.goodreads.com/search/index.xml?key=UpBHaR7fwh6PRIL078f4Rg&search%5Bfield%5D=title&'+'&q='+ self.searchTitle()+'&page='+page.pageNumber();
   $.get(url, function(data){
	  
	    self.books($.map(data.firstElementChild.getElementsByTagName("work"), function (result) {
               return new book(result);
          }));
   });
}
    }
	self.searchByNextOrBack  = function(isNext) {
		    
var index = self.pages().findIndex(x => x.isActive==true);


 var page =isNext?self.pages()[index+1]:self.pages()[index-1]

self.searchWithPage(page);
	};


    // Operations
   
}

ko.applyBindings(new BooksListViewModel());