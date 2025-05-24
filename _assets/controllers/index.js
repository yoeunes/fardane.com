import { Controller } from "@hotwired/stimulus"

// Connects to data-controller="terminology"
export default class extends Controller {
  connect() {
    console.log("Terminology controller connected")
  }

  // Define your controller actions here
}