package com.charleshl.server.todoapp.controller;

import com.charleshl.server.mainframe.config.auth.UserPrincipal;
import com.charleshl.server.mainframe.entity.UserDO;
import com.charleshl.server.mainframe.service.UserService;
import com.charleshl.server.mainframe.utils.Utils;
import com.charleshl.server.todoapp.entity.TaskDO;
import com.charleshl.server.todoapp.service.TaskService;
import jakarta.annotation.PostConstruct;
import jakarta.persistence.EntityNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;

@RestController
public class TasksController {

    @Autowired
    private UserService userService;

    @Autowired
    private TaskService taskService;

    @PostConstruct
    // TEMPORARY: Initialize the database with some tasks
    private void init() {
        List<TaskDO> taskList = new ArrayList<>();
        UserDO user = userService.getUserByUsername("admin_todo_app");
        taskList.add(new TaskDO("Plan a trip to a foreign country", "Choose a destination, research accommodations, transportation options, and activities to do. Create an itinerary for your trip.", user));
        taskList.add(new TaskDO("Learn a new language", "Choose a language you are interested in learning, and find resources such as language-learning apps, books, and classes to help you learn. Set a goal for yourself to become proficient in the language.", user));
        taskList.add(new TaskDO("Organize a charity fundraiser", "Choose a cause you are passionate about, and plan a fundraising event to raise money for that cause. Coordinate with volunteers, secure a venue, and promote the event to the community.", user));
        taskList.add(new TaskDO("Create a budget plan", "Evaluate your income and expenses, and create a detailed budget plan to help you manage your finances. Identify areas where you can cut back on spending and find ways to save money.", user));
        taskList.add(new TaskDO("Design a website", "Choose a topic for your website, and create a design and layout that is user-friendly and visually appealing. Add content such as text, images, and videos to your site.", user));
        taskList.add(new TaskDO("Start a fitness routine", "Create a workout plan that includes both cardio and strength training exercises. Set achievable fitness goals and track your progress.", user));
        taskList.add(new TaskDO("Write a short story", "Choose a topic or theme for your story, and create characters and a plot that is engaging and interesting. Edit and revise your story until you are satisfied with the final product.", user));
        taskList.add(new TaskDO("Learn to cook a new dish", "Choose a recipe for a dish you have never cooked before, and follow the steps to prepare the meal. Experiment with different spices and ingredients to customize the dish to your taste.", user));
        taskList.add(new TaskDO("Create a social media strategy", "Choose a social media platform, and create a strategy to grow your following and engagement. Identify your target audience, create content that resonates with them, and analyze your metrics to improve your strategy.", user));
        taskList.add(new TaskDO("Build a piece of furniture", "Choose a piece of furniture to build, such as a desk or bookshelf. Research materials and tools needed, and follow instructions to construct the piece.", user));
        taskService.saveAllTasks(taskList);
    }

    @GetMapping("/tasks")
    public ResponseEntity<List<TaskDO>> getMyTasks() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        String username = ((UserPrincipal) authentication.getPrincipal()).getUsername();
        UserDO user = userService.getUserByUsername(username);
        return new ResponseEntity<>(taskService.getAllTasksByUser(user), HttpStatus.OK);
    }

    @PostMapping("/task/{id}/done/{isDone}")
    public ResponseEntity<TaskDO> postIsTaskDone(@PathVariable("id") long id, @PathVariable("isDone") boolean isDone) {
        try {
            TaskDO taskDO = taskService.getTaskById(id);
            taskDO.setDone(isDone);
            taskService.saveTask(taskDO);
            return new ResponseEntity<>(taskDO, HttpStatus.OK);
        } catch (EntityNotFoundException e)  {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
    }
}
