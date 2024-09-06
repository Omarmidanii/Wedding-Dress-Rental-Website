# Wedding Dress Rental Website

This is a Wedding Dress Rental Website built with Laravel as the back-end and ReactJS as the front-end. The reason for building this website is to implement a task provided by Voila Company.

## Getting Started

To run this project locally, follow these steps:

### Backend Setup

1. Clone this repository.
2. Navigate to the backend directory in your terminal.
3. Run `composer install`.
4. Copy the `.env_example` file and rename it to `.env`. Edit this file as follows:
   - **App URL**: `APP_URL=http://localhost:8000`
   - **Database Configuration**:
     ```env
     DB_CONNECTION=mysql
     DB_HOST=127.0.0.1
     DB_PORT=3306
     DB_DATABASE=WDR
     DB_USERNAME=root
     DB_PASSWORD=
     ```
   - **Mail Configuration**:
     ```env
     MAIL_MAILER="smtp"
     MAIL_HOST="smtp.gmail.com"
     MAIL_PORT="465"
     MAIL_USERNAME="omarmidani90@gmail.com"
     MAIL_PASSWORD="aioj ujnd qndg xvxy"
     MAIL_ENCRYPTION="tls"
     MAIL_FROM_ADDRESS="omarmidani90@gmail.com"
     MAIL_FROM_NAME="OmarMidani.test"
     ```
5. Run `php artisan key:generate`.
6. Run `php artisan migrate`.
7. Run `php artisan db:seed`.
8. Run `php artisan serve`.

### Frontend Setup

1. Navigate to the front-end directory.
2. Run `npm install`.
3. Run `npm run dev`.

And there you go! Register your email and then get inside!
