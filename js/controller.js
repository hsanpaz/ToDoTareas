angular.module('TodoList',['LocalStorageModule'])
  .factory('TodoService',function(localStorageService){
    var todoService = {};
    todoService.key = 'mytodolista';
    if (localStorageService.get(todoService.key))
    {
      todoService.activities = localStorageService.get(todoService.key);
    }
    else
    {
      todoService.activities=[];
    }
    todoService.add = function(NewActividad){
      todoService.activities.push(NewActividad);
      todoService.UpLocalStorage();
    };
    todoService.UpLocalStorage = function(){
      localStorageService.set(todoService.key,todoService.activities);
    };
    todoService.clean = function(){
      todoService.activities = [];
      todoService.UpLocalStorage();
    };
    todoService.getAll = function(){
      return todoService.activities;
    }
    todoService.delete = function(item){
      todoService.activities = todoService.activities.filter(function(activity){
        return activity !== item;
      });
      todoService.UpLocalStorage();
      return todoService.getAll();
    }
    return todoService;
  })
  .controller('TodoController',function($scope,TodoService){
      $scope.todo = TodoService.getAll();
      $scope.NewActividad = {};
      $scope.Addactividad = function()
      {
          TodoService.add($scope.NewActividad);
          $scope.todo=TodoService.getAll();
          $scope.NewActividad = {};
      }
      $scope.removeitem = function(item)
      {
        $scope.todo = TodoService.delete(item);
      }
      $scope.limpiar = function()
      {
        $scope.todo = TodoService.clean();
      }
  });
