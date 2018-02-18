var board = {
	name: 'Tablica Kanban',
	createColumn: function(column) {
	  this.element.append(column.element);
	  initSortable();
	},
	element: $('#board .column-container')
};

$('.create-column')
	.click(function(){
		var columnName = prompt('Enter a column name');
		$.ajax({
			url: baseUrl + '/column',
			method: 'POST',
			data: {
				name: columnName
			},
			success: function(response) {
				var column = new Column(response.id, columnName);
				board.createColumn(column);
			}
		});
	});
	
function initSortable() {
    $('.card-list').sortable({
      connectWith: '.card-list',
      placeholder: 'card-placeholder',
      receive: function(event, ui) {
      	var newParentId = ui.item.parent().parent().data('id');
      	var draggedElementId = ui.item.data('id');
      	var draggedElementName = ui.item.find(".card-description").text();

        $.ajax({
	  		url: baseUrl + '/card/' + draggedElementId,
	  		method: 'PUT',
	  		data: {
	  			name: draggedElementName,
	  			bootcamp_kanban_column_id: newParentId
	  		}
	  	}); 
      }
    }).disableSelection();
  }