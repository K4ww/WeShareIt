<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;
use Psr\Log\LoggerInterface;
use Doctrine\DBAL\Connection; // Import Doctrine DBAL Connection

final class PagesController extends AbstractController
{
    private LoggerInterface $logger;
    private Connection $connection; // Declare DBAL Connection

    // Inject LoggerInterface and DBAL Connection via constructor
    public function __construct(LoggerInterface $logger, Connection $connection)
    {
        $this->logger = $logger;
        $this->connection = $connection; // Store the DBAL connection
    }

    #[Route('/login', name: 'login_page')]
    public function login(): Response
    {
        return $this->render('login.html.twig');
    }

    #[Route('/subscription', name: 'subscription_page')]
    public function subscription(): Response
    {
        return $this->render('subscription.html.twig');
    }

    #[Route('/subscription/submit', name: 'subscription_submit', methods: ['POST'])]
    public function submitSubscription(Request $request): JsonResponse
    {
        // Decode the JSON request body
        $data = json_decode($request->getContent(), true);

        // Validate required fields
        if (empty($data['name']) || empty($data['username']) || empty($data['password']) || empty($data['university']) || empty($data['level'])) {
            return new JsonResponse(['status' => 'error', 'message' => 'All fields are required!'], Response::HTTP_BAD_REQUEST);
        }




        // Insert data into the 'users' table (assuming database fields are: fullname, username, password, iduniversity, idmaster)
        try {
            $this->connection->insert('users', [
                'fullname' => $data['name'],
                'username' => $data['username'],
                'password' => password_hash($data['password'], PASSWORD_BCRYPT), // Use bcrypt to hash the password
                'iduniversity' => $data['university'], // Assuming university ID is sent as an integer
                'idmaster' => $data['level'] // The mapped master level
            ]);

            // Log the successful data insertion
            $this->logger->info('New subscription added to database:', $data);

            // Respond with a success message
            return new JsonResponse([
                'status' => 'success',
                'message' => 'Subscription successful!'
            ]);
        } catch (\Exception $e) {
            // Log the error and respond with an error message
            $this->logger->error('Error inserting subscription data:', ['error' => $e->getMessage()]);

            return new JsonResponse([
                'status' => 'error',
                'message' => 'An error occurred while processing your subscription!'
            ], Response::HTTP_INTERNAL_SERVER_ERROR);
        }
    }
}
